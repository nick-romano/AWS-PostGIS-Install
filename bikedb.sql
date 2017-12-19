
CREATE DOMAIN polarity TEXT
CHECK (
VALUE ~ 'positive' OR
VALUE ~ 'negative'
);


CREATE TABLE impactlocations(
	oid serial PRIMARY KEY,
	polarity polarity,
	description varchar(255),
	dist_bus DOUBLE PRECISION,
	dist_intersection DOUBLE PRECISION,
	num_companies_100ft integer,
	dist_park DOUBLE PRECISION,
	rid integer,
	geom geometry(POINT, 4326)
	);

ALTER TABLE impactlocations OWNER TO postgres;

CREATE DOMAIN FacType TEXT
CHECK (
VALUE ~ 'Bike Boulevard' OR
VALUE ~ 'Bike Lane' OR
VALUE ~ 'Contraflow' OR
VALUE ~ 'Cycle Track' OR
VALUE ~ 'Shared Bus Bike' OR
VALUE ~ 'Sharrow' OR
VALUE ~ 'None'
);

CREATE DOMAIN Direction TEXT 
CHECK (
VALUE ~ 'To destination' OR
VALUE ~ 'From destination'
)	

CREATE TABLE routepaths(
	RID serial PRIMARY KEY,
	RiderName VARCHAR(55),
	FacType CHAR(16),
	Direction CHAR(16),
	geom geometry(LINESTRING, 4326),
	OWNER nromano
	);

ALTER TABLE routepaths OWNER TO postgres;