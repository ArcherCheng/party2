using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Models;
using PartyApi.Repository; 

namespace PartyApi.Controllers
{
    [Authorize]
    [Route("api/member/{userId}/photos")]
    [ApiController]
    public class PhotoController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepoMemberPhoto _repo;
        private readonly IRepoMember _repoMember;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IMapper mapper, IRepoMemberPhoto repo, IRepoMember repoMember
             ,IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _mapper = mapper;
            _repo = repo;
            _repoMember = repoMember;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _repo.Get(id);
            var dtoPhotoList = _mapper.Map<DtoPhotoList>(photo);
            return Ok(dtoPhotoList);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]DtoPhotoCreate dtoPhotoCreate)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = _repoMember.Get(userId);
            if(member == null)
                return Unauthorized();

            var file = dtoPhotoCreate.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(640).Height(480).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            dtoPhotoCreate.photoUrl = uploadResult.Uri.ToString();
            dtoPhotoCreate.publicId = uploadResult.PublicId;
            dtoPhotoCreate.descriptions = file.FileName;

            var photo = _mapper.Map<MemberPhoto>(dtoPhotoCreate);
            photo.UserId = userId;
            if (!_repo.hasMainPhoto(userId))
                photo.IsMain = true;

            _repo.Add<MemberPhoto>(photo);
            if (await _repo.SaveAllAsync()>0)
            {
                var dtoPhotoList = _mapper.Map<DtoPhotoList>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, dtoPhotoList);
            }
            return BadRequest("無法上傳新增相片");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = _repoMember.Get(userId);
            if(member == null)
                return Unauthorized();
                
            var photo = await _repo.Get(id);
            if (photo == null)
                return Unauthorized();

            if (photo.IsMain)
                return BadRequest("這個相片已經是設為封面了");

            var currentMainPhoto = await _repo.GetMainPhoto(userId);
            if (currentMainPhoto != null)
                currentMainPhoto.IsMain = false;

            photo.IsMain = true;
            if (_repo.SaveAll()>0)
                return NoContent();

            return BadRequest("無法設定相片封面,請洽服務人員");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // var member = _repoMember.Get(userId);
            var photo = await _repo.Get(id);
            if (photo == null)
                return Unauthorized();

            if (photo.IsMain)
                return BadRequest("這個相片已經是設為封面了,不能刪除");

            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if (result.Result == "ok")
                {
                    _repo.Delete(photo);
                }
            }
            else
            {
                _repo.Delete(photo);
            }

            if (_repo.SaveAll()>0)
                return NoContent();

            return BadRequest("無法刪除相片檔,請洽服務人員");
        }
    }
}