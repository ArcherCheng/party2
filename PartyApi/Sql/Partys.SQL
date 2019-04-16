--------------------------------------------------------------------------------------------
/*
drop table PartyPhoto  --活動主檔
drop table Party  --活動主檔
*/
go
--------------------------------------------------------------------------------------------
--活動日期檔
--------------------------------------------------------------------------------------------
--drop table Party
go
create table Party
(
	PartyId       int identity(1,1) not null,
	PartyName     nvarchar(128)  not null,--活動名稱
	PartyDate     date           not null,--活動日期
	BeginTime     nvarchar(8)    not null,--開始時間
	EndTime       nvarchar(8)    not null,--結束時間
	Marry         int            not null, --條件限制(1=單身未婚 , 2=晚婚二春)
	Persons       int            not null,--預定人數

	ManAmt        int  not   null,--男生金額
	ManEducaton   int  not   null,--男生學歷
	ManAge1       int  not   null,--男生年次從
	ManAge2       int  not   null,--男生年次到

	WomanAmt        int  not   null,--女生金額
	WomanEducaton   int  not   null,--女生學歷
	WomanAge1       int  not   null,--女生年次從
	WomanAge2       int  not   null,--女生年次到

	EarlyDate	    date  NOT   null,--早鳥日期
	EarlyManAmt     int   NOT   null,--男生早鳥金額
	EarlyWomanAmt   int   NOT   null,--女生早鳥金額
	WomenAmt        int   NOT   null,--女生二人以上同行金額

	PictureUrl      nvarchar(128)  null,--首面圖片
	Restaurant      nvarchar(32)   null,--餐廳名稱
	AddressNo       nvarchar(128)  null,--餐廳地址
	BusNote         nvarchar(256)  null,--交通說明
	Notes           nvarchar(256)  null,--備註

	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,
	constraint pk_Party primary key (partyId) 
);
go

create index Party_in1 on Party (PartyDate asc);
go


create trigger tr_Party_iud on Party after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='Party';

	declare @istype tinyint;
	set @istype=0;
 
	if exists(select 1 from inserted) and not exists(select 1 from deleted)
		set @istype = 1;    --insert
	else if not exists(select 1 from inserted) and exists(select 1 from deleted)
		set @istype = 3;    --delete
	else if exists(select 1 from inserted) and exists(select 1 from deleted)
		begin
			set @istype = 2;    --update
			--以下情況不做log
			--使用者欲刪除資料時,程式會先更新刪除者及刪除時間位置(writetype=3)..等,這是屬於刪除的前置作業,不做log,只做刪除這個動作的log
			--月結過帳時須資料會整批先清為零(writetype=4),就不做log,逐筆計算時,再做寫入log
			declare @wrtype int;
			select @wrtype=writetype from inserted;
			if @wrtype > 2 return; 
		end
	
	declare @insertdata nvarchar(max);
	declare @deletedata nvarchar(max);

	set @insertdata=(select * from inserted for json auto);
	set @deletedata=(select * from deleted for json auto);

	insert into aa9log10(tablename,insertdata,deletedata,istype)values(@tablename,@insertdata,@deletedata,@istype);
end
go

-------------------------------------------------------------------------------------
--派對相片檔
-------------------------------------------------------------------------------------
--Drop table PartyPhoto
go
create table PartyPhoto
(
	Id             int identity(1,1) not null ,
	PartyId        int not null ,
	Descriptions   nvarchar(256) ,
	PhotoUrl       nvarchar(256) ,
	PublicId       nvarchar(256) ,
	IsMain         bit ,
	AddedDate      datetime,

	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,
	constraint pk_PartyPhoto primary key (Id)
);
Go

Create index PartyPhoto_n1 on PartyPhoto(PartyId,Id) ;
go

Alter table PartyPhoto add constraint Photo_Party
      foreign key (PartyId)
      references Party(PartyId)
	  ON UPDATE CASCADE
	  ON DELETE NO ACTION
go

create trigger tr_PartyPhoto_iud on PartyPhoto after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='PartyPhoto';

	declare @istype tinyint;
	set @istype=0;
 
	if exists(select 1 from inserted) and not exists(select 1 from deleted)
		set @istype = 1;    --insert
	else if not exists(select 1 from inserted) and exists(select 1 from deleted)
		set @istype = 3;    --delete
	else if exists(select 1 from inserted) and exists(select 1 from deleted)
		begin
			set @istype = 2;    --update
			--以下情況不做log
			--使用者欲刪除資料時,程式會先更新刪除者及刪除時間位置(writetype=3)..等,這是屬於刪除的前置作業,不做log,只做刪除這個動作的log
			--月結過帳時須資料會整批先清為零(writetype=4),就不做log,逐筆計算時,再做寫入log
			declare @wrtype int;
			select @wrtype=writetype from inserted;
			if @wrtype > 2 return; 
		end
	
	declare @insertdata nvarchar(max);
	declare @deletedata nvarchar(max);

	set @insertdata=(select * from inserted for json auto);
	set @deletedata=(select * from deleted for json auto);

	insert into aa9log10(tablename,insertdata,deletedata,istype)values(@tablename,@insertdata,@deletedata,@istype);
end
go



/*
--drop table PartySummary
go
create table PartySummary
(
	PartyId       int identity(1,1) not null,
	PartyName     nvarchar(128)  null,--活動名稱
	Marry         int            null,--條件限制(1=單身未婚 , 2=二春無小孩 , 3=二春有小孩)
	PartyDate     date           null,--活動日期
	Restaurant    nvarchar(32)   null,--餐廳名稱
	TotalPersons  int            null,--全場報名人數
	AvgOlds       int            null,--全場平均年齡
	TotalMen      int            null,--男生報名人數
	AvgMenOlds    int            null,--男生平均年齡
	TotalWomen    int            null,--女生報名人數
	AvgWomenOlds  int            null,--女生平均年齡
	TotalMatch    int            null,--成功配對人數

	constraint pk_PartySummary primary key (partyId) 
);
go
*/



----------------------------------------------------------------------------------
----活動留言檔 ma2dat21
----------------------------------------------------------------------------------
----drop table ma2dat21
--go
--create table ma2dat21
--(
--	id             int identity(1,1) not null,
--	partyId          int not null,
--	userId         int not null ,
--	contents       nvarchar(1024) not null, 
--	userDelete     bit null , 
--	sysDelete      bit null ,

--	--以下由系統自行產生
--	writeType     integer        null,
--	writeTime     datetime       null,
--	writeUser     nvarchar(32)   null,
--	writeIp       nvarchar(32)   null,
--	constraint pk_ma2dat21 primary key (id)
--);
--go

--create index ma2dat21_in1 on ma2dat21(partyId,userId) ;
--go
--create index ma2dat21_in2 on ma2dat21(userId,partyId) ;
--go

----alter table ma2dat21 drop constraint ma2dat21_partyId
--go
--alter table ma2dat21 add constraint ma2dat21_partyId
--        foreign key (partyId)
--        references party(partyId)
--        --on update cascade
--        --on delete cascade
--go

----alter table ma2dat21 drop constraint ma2dat21_usrId
--go
--alter table ma2dat21 add constraint ma2dat21_userId
--    foreign key (userId)
--    references member(userId)
--    --on update cascade
--    --on delete cascade
--go


----------------------------------------------------------------------------------
----活動私訊檔 ma2dat22
----------------------------------------------------------------------------------
----drop table ma2dat22
--go
--create table ma2dat22
--(
--	id              int identity(1,1) not null,
--	partyId         int not null,
--	userId          int not null ,
--	recipientId     int not null ,
--	contents        nvarchar(1024) not null, 
--	sendDate        datetime null , 

--	userDelete      bit null , 
--	userDeleteDate  datetime null , 

--	isRead          bit null , 
--	readDate        datetime null , 

--	reciDelete      bit null ,
--	reciDeleteDate  datetime null , 
	
--	--以下由系統自行產生
--	writeType     integer        null,
--	writeTime     datetime       null,
--	writeUser     nvarchar(32)   null,
--	writeIp       nvarchar(32)   null,
--	constraint pk_ma2dat22 primary key (id)
--);
--go

--create index ma2dat22_in1 on ma2dat22(partyId,userId,recipientId) ;
--go
--create index ma2dat22_in2 on ma2dat22(userId,recipientId,partyId) ;
--go

----alter table ma2dat22 drop constraint ma2dat22_partyId
--go
--alter table ma2dat22 add constraint ma2dat22_partyId
--        foreign key (partyId)
--        references party(partyId)
--        --on update cascade
--        --on delete cascade
--go

----alter table ma2dat22 drop constraint ma2dat22_usrid
--go
--alter table ma2dat22 add constraint ma2dat22_userId
--    foreign key (userId)
--    references member(userId)
--    --on update cascade
--    --on delete cascade
--go


----alter table ma2dat22 drop constraint ma2dat22_usrid
--go
--alter table ma2dat22 add constraint ma2dat22_recipientId
--    foreign key (recipientId)
--    references member(userId)
--    --on update cascade
--    --on delete cascade
--go


------------------------------------------------------------------------------------------------
------我的投票檔
------------------------------------------------------------------------------------------------
----drop table ma2dat30
--go
--create table ma2dat30
--(
--	id             int identity(1,1) not null ,
--	partyId        int            not null, --活動名稱
--	userId         int            not null, --會員姓名
--	likeId         int            not null, --心怡我的人姓名

--	--以下每檔資料表都會有這些欄位
--	writeType     integer        null,
--	writeTime     datetime       null,
--	writeUser     nvarchar(32)   null,
--	writeIp       nvarchar(32)   null,
--	constraint pk_ma2dat30 primary key (id) 
--);
--go

--create index ma2dat30_in1 on ma2dat30 (partyId asc,userId asc,likeid asc);
--go
--create index ma2dat30_in2 on ma2dat30 (partyId asc,likeid asc,userId asc);
--go

----alter table ma2dat30 drop constraint ma2dat30_partyId
--go
--alter table ma2dat30 add constraint ma2dat30_partyId
--        foreign key (partyId)
--        references party(partyId)
--        --on update cascade
--        --on delete cascade
--go

----alter table ma2dat30 drop constraint ma2dat30_usrid
--go
--alter table ma2dat30 add constraint ma2dat30_userId
--    foreign key (userId)
--    references member(userId)
--    --on update cascade
--    --on delete cascade
--go


----alter table ma2dat30 drop constraint ma2dat30_likeId
--go
--alter table ma2dat30 add constraint ma2dat30_likeId
--    foreign key (likeId)
--    references member(userId)
--    --on update cascade
--    --on delete cascade
--go

----------------------------------------------------------------------------------------------
----活動相片檔
----------------------------------------------------------------------------------------------
----drop table ma2dat40
--go
--create table ma2dat40
--(
--	id             int identity(1,1) not null ,
--	partyId        int not null ,
--	descriptions   nvarchar(256) ,
--	photoUrl       nvarchar(256) ,
--	publicId       nvarchar(256) ,
--	isMain         bit ,

--	--以下每檔資料表都會有這些欄位
--	writeType     integer        null,
--	writeTime     datetime       null,
--	writeUser     nvarchar(32)   null,
--	writeIp       nvarchar(32)   null,
--constraint pk_ma2dat40 primary key (id)
--);
--go

--create index in_ma2dat40_n1 on ma2dat40(partyId,id) ;
--go

----alter table ma2dat40 drop constraint ma2dat40_partyId
--go
--alter table ma2dat40 add constraint ma2dat40_partyId
--      foreign key (partyId)
--      references party(partyId)
--go






