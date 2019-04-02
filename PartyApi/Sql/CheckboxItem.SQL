drop table CheckboxItem
go
create table CheckboxItem
(
	Id            int identity(1,1) not null,
	KeyGroup      nvarchar(32)      not null, 
	KeyId         int               not null,
	KeyValue      nvarchar(32)      not null,
	IsChecked     bit               not null,
	KeyLabel      nvarchar(64)      null,
	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,	
	constraint pk_CheckboxItem primary key (Id) 
);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Blood',1,'A',0);
GO
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Blood',2,'B',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Blood',3,'O',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Blood',4,'AB',0);
go

insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',1,'水瓶座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',2,'雙魚座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',3,'牡羊座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',4,'金牛座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',5,'雙子座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',6,'巨蟹座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',7,'獅子座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',8,'處女座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',9,'天秤座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',10,'天蠍座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',11,'射手座',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Star',12,'魔羯座',0);
go


insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',1,'基隆市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',2,'台北市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',3,'新北市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',4,'桃園市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',5,'新竹縣市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',6,'苗栗縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',7,'台中市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',8,'彰化縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',9,'南投縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',10,'雲林縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',11,'嘉義縣市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',12,'台南市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',13,'高雄市',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',14,'屏東縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',15,'宜蘭縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',16,'花蓮縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',17,'台東縣',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',18,'澎湖金馬',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('City',19,'其他',0);
go


insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',1,'佛教',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',2,'道教',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',3,'基督教',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',4,'天主教',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',5,'伊斯蘭教',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',6,'一貫道',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Religion',7,'其他',0);
go


insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',1,'公務機關',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',2,'學校機關',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',3,'軍警消機關',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',4,'國營事業機關',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',5,'上市櫃公司',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',6,'外商公司',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',7,'金融保險業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',8,'電子科技業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',9,'機械電機業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',10,'化學化工業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',11,'生物科技業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',12,'醫療保建業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',13,'百貨餐旅服務業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',14,'其他製造業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',15,'一般中小企業',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',16,'醫師律師會計師',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',16,'自有事業工作者',0);
go
insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
values('Job',17,'其他',0);
go

--看書
--看電視
--看電影
--聽音樂
--戶外活動
--電腦上網
--寵物
--個性
--美食


-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'看書',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'看電視',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'看電影',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'聽音樂',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'爬山健行',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'旅遊踏青',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'上網滑手機',0);
-- go
-- insert into CheckboxItem(KeyGroup,KeyId,KeyValue,IsChecked) 
-- values('Activity',1,'玩電玩',0);
-- go



-- create table ma9pnl10(
-- 	個性      nvarchar(32)   not null,
-- 	constraint pk_ma9pnl10 primary key (個性)
-- )
-- go
-- insert into ma9pnl10(個性) values('温和');
-- go
-- insert into ma9pnl10(個性) values('獨立');
-- go
-- insert into ma9pnl10(個性) values('包容');
-- go
-- insert into ma9pnl10(個性) values('樂觀');
-- go
-- insert into ma9pnl10(個性) values('沉默');
-- go

-- create table ma9skl10(
-- 	專長      nvarchar(32)   not null,
-- 	constraint pk_ma9skl10 primary key (專長)
-- )
-- go
-- insert into ma9skl10(專長) values('電腦');
-- go
-- insert into ma9skl10(專長) values('音樂');
-- go
-- insert into ma9skl10(專長) values('烹調');
-- go
-- insert into ma9skl10(專長) values('水電');
-- go
-- insert into ma9skl10(專長) values('健身');
-- go




