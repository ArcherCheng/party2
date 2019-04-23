--------------------------------------------------------------------------------------------
--報名資料檔
--------------------------------------------------------------------------------------------
--drop table Activity
go
create table Activity
(
	Id            int identity(1,1) not null ,
	PartyId       int               not null,
	UserId        int               not null,
	ApplyDate     datetime          not null,--報名日期
	ActAmt        int               not null,--活動應繳金額
	IsWaiting     int               not null,--是否後補

	--以下為會員繳款資料
	BankName      nvarchar(32)   null, --轉帳銀行
	BankNumber6   nvarchar(32)   null, --帳號後6碼
	BankDate      nvarchar(32)   null, --轉帳日期
	FriendsName   nvarchar(32)   null, --同伴姓名

	--以下為系統人員來輸入維護
	MyNo          int      not   null,--我的編號
	CheckOver     int      not   null,--審核完成
	RetrunNote    nvarchar(64)   null,--退費說明
	Notes         nvarchar(128)  null,--備註

	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,
	constraint pk_Activity primary key (Id) 
);
go

create unique index  Activity_in1 on Activity (PartyId asc,UserId asc);
go
create unique index  Activity_in2 on Activity (UserId asc,PartyId asc);
go


--alter table activity drop constraint Activity_PartyId
go
alter table Activity add constraint Activity_Party
      foreign key (PartyId)
      references Party(PartyId)
	  ON UPDATE CASCADE
	  ON DELETE NO ACTION

--alter table Activity drop constraint Activity_UsrId
go
alter table Activity add constraint Activity_Member
      foreign key (UserId)
      references Member(UserId)
	  on update CASCADE
	  on DELETE NO ACTION
go


create trigger tr_Activitys_iud on Activity after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='Activity';

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

-------------------------------------------------------------------------
--活動統計資料
-------------------------------------------------------------------------

--統計每場活動報名人數及平均年齡(全部)
drop view ViewActivityPersons
go
create view ViewActivityPersons as 
select a.PartyId,count(a.PartyId) TotalPersons,AVG(YEAR(a.ApplyDate) - b.BirthYear) as AvgOlds 
from Activity a,Member b 
where a.UserId = b.UserId  
group by a.PartyId 
go

--統計每場活動報名人數及平均年齡(男生)
drop view ViewActivityMen
go
create view ViewActivityMen as 
select a.PartyId,count(a.PartyId) TotalMen,AVG(YEAR(a.ApplyDate) - b.BirthYear) as AvgMenOlds 
from Activity a,Member b
where a.UserId = b.UserId and b.sex=1
group by a.PartyId 
go

--統計每場活動報名人數及平均年齡(女生)
drop view ViewActivityWomen
go
create view ViewActivityWomen as 
select a.PartyId,count(a.PartyId) TotalWomen,AVG(YEAR(a.ApplyDate) - b.BirthYear) as AvgWomenOlds
from Activity a,Member b 
where a.UserId = b.UserId and b.sex=2
group by a.PartyId 
go

--統計每場成功配對人數及投票數
drop view ViewActivityMatches
go
create view ViewActivityMatches as 
select a.Partyid,count(a.PartyId) TotalMatch, (select count(c.PartyId) from Liker c where c.PartyId=a.partyId) as TotalVotes
from liker a ,liker b
where a.LikerId = b.UserId and a.UserId = b.LikerId and b.PartyId = a.PartyId 
group by a.PartyId
go


drop view ViewActivitySummary
go
create view ViewActivitySummary as 
select a.PartyId,a.PartyName,a.PartyDate,a.Restaurant,a.Marry,
b.TotalPersons,b.AvgOlds,
c.TotalMen,c.AvgMenOlds,
d.TotalWomen,d.AvgWomenOlds,
e.TotalVotes,e.TotalMatch
from Party a, ViewActivityPersons b,ViewActivityMen c,ViewActivityWomen d,ViewActivityMatches e 
where a.PartyId=b.PartyId and a.PartyId=c.PartyId and a.PartyId=d.PartyId and a.PartyId=e.PartyId
go

select * from ViewActivitySummary
go

drop view ViewActivityMatchUser
go

create view ViewActivityMatchUser as 
select a.Partyid,a.UserId,a.LikerId 
from liker a ,liker b
where a.LikerId = b.UserId and a.UserId = b.LikerId and b.PartyId = a.PartyId 
go

select * from ViewActivityMatchUser
go




/*
drop function af_activity_sex_count
go
create function af_activity_sex_count(@as_partyId integer,@ai_sex integer)
returns integer
begin
  declare @rc integer 
  if (@ai_sex=1)
	select @rc=count(a.partyId) from activity a ,member b where a.partyId=@as_partyId and a.userId=b.userId and b.sex=1;
  else if (@ai_sex=2)
	select @rc=count(a.partyId) from activity a ,member b where a.partyId=@as_partyId and a.userId=b.userId and b.sex=2;
  else 
	select @rc=count(a.partyId) from activity a where a.partyId=@as_partyId;

  return @rc;
end
go

--alter table party drop column totalPns 
--alter table party drop column manPns 
--alter table party drop column womanPns 
go
alter table party add totalPns as dbo.af_activity_sex_count(partyId,0)
go
alter table party add manPns as dbo.af_activity_sex_count(partyId,1)
go
alter table party add womanPns as dbo.af_activity_sex_count(partyId,2)
go

*/

