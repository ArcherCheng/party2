--計算會員參加活動的次數
drop function af_count_member_activity;
go
create function af_count_member_activity(@as_userId integer)
returns integer
begin
    declare @rc integer ;
    select @rc=count(a.partyId) from activity a where a.UserId=@as_userId;
    return @rc;
end
go

alter table Member drop column ActivityCounts;
go
alter table Member add ActivityCounts as dbo.af_count_member_activity(UserId);
go
select * from Member