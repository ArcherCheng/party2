using AutoMapper;
using System.Linq;
using PartyApi.Dtos;
using PartyApi.Models;
using PartyApi.Helpers;

namespace PartyApi.Dtos
{
    public class AutoMapperProfiles : AutoMapper.Profile
    {
        public AutoMapperProfiles() 
        {
            //login 會員登入資料檔
            CreateMap<DtoRegister, Member>();
            CreateMap<CheckboxItem,DtoCheckboxItem>();
            CreateMap<Member, DtoLoginToReturn>()
                .ForMember(dest => dest.UserName, opt =>
                        {
                            opt.MapFrom(src => string.IsNullOrEmpty(src.NickName) ? src.FirstName + (src.Sex == 1 ? "'R" : "'S") : src.NickName); 
                        });

            //會員資料檔
            CreateMap<Member, DtoMemberList>()
               .ForMember(dest => dest.UserName, opt =>
                        {
                            opt.MapFrom(src => string.IsNullOrEmpty(src.NickName) ? src.FirstName + (src.Sex == 1 ? "'R" : "'S") : src.NickName); 
                        })
               .ForMember(dest => dest.Age, opt =>
                       {
                           opt.MapFrom(src => src.Birthday.CalculateYearsOld());
                       })
                .ForMember(dest => dest.PhotoUrl, opt =>
                        {
                            opt.MapFrom(src => src.MemberPhoto.FirstOrDefault(p => p.IsMain).PhotoUrl);
                        });

            CreateMap<Member, DtoMemberDetail>()
               .ForMember(dest => dest.UserName, opt =>
                       {
                           opt.MapFrom(src => string.IsNullOrEmpty(src.NickName) ? src.FirstName + (src.Sex == 1 ? "'R" : "'S") : src.NickName); //(src.sex == 1 ? "先生" : "小姐")
                       })
                .ForMember(dest => dest.Age, opt =>
                       {
                           opt.MapFrom(src => src.Birthday.CalculateYearsOld());
                       })
                .ForMember(dest => dest.PhotoUrl, opt =>
                       {
                           opt.MapFrom(src => src.MemberPhoto.FirstOrDefault(p => p.IsMain).PhotoUrl);
                       })
                .ForMember(dest => dest.Photos, opt =>
                        {
                            opt.MapFrom(src => src.MemberPhoto);
                        });

            CreateMap<Member, DtoMemberEdit>().ReverseMap();
            CreateMap<MemberCondition, DtoMemberCondition>().ReverseMap();

            //個人上傳相片檔
            CreateMap<MemberPhoto, DtoPhotoList>();
            CreateMap<MemberPhoto, DtoPhotoCreate>().ReverseMap();

            //Party 活動資料檔
            CreateMap<DtoPartyDetail, Party>().ReverseMap();
            CreateMap<Party, DtoPartyList>();
            // CreateMap<DtoParty,Party>();

            //Activity 會員留言訊息資料檔
            CreateMap<Message, DtoMessageList>()
               .ForMember(dest => dest.SenderName, opt =>
                    opt.MapFrom(src => string.IsNullOrEmpty(src.Sender.NickName) ? src.Sender.FirstName + (src.Sender.Sex == 1 ? "'R" : "'S") : src.Sender.NickName))  //(src.sex == 1 ? "先生" : "小姐")
               .ForMember(dest => dest.RecipientName, opt =>
                    opt.MapFrom(src => string.IsNullOrEmpty(src.Recipient.NickName) ? src.Recipient.FirstName + (src.Recipient.Sex == 1 ? "'R" : "'S"): src.Recipient.NickName)) //(src.sex == 1 ? "先生" : "小姐")
                .ForMember(dest => dest.SenderPhotoUrl, opt => 
                    opt.MapFrom(src => src.Sender.MemberPhoto.FirstOrDefault(p => p.IsMain).PhotoUrl))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => 
                    opt.MapFrom(src => src.Recipient.MemberPhoto.FirstOrDefault(p => p.IsMain).PhotoUrl));

            CreateMap<DtoMessageCreate,Message>();
        }
    }
}