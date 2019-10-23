select d.id, 
d.org_name, 
d.addrln1,
d.addrln2, d.distance from (select 
*,
3956* acos((sin(radians(${latitude})) * sin(radians(o.latitude))) + cos(radians(${latitude})) * cos(radians(o.latitude)) * cos(radians(o.longitude) - radians(${longitude}))) as distance 
from organization o) d
where distance < ${range};