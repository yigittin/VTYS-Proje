--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-08-19 23:49:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 219 (class 1255 OID 57606)
-- Name: billing(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.billing() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	DECLARE
	buyed_shop smallint;
	billinc smallint;
	BEGIN
	billinc:=(select bill_no from bill order by bill_no desc limit 1)+1;
	buyed_shop:=(select shopid from shop order by shopid desc limit 1);
	INSERT INTO bill(bill_no,bill_date,shopid) VALUES (billinc,CURRENT_DATE,buyed_shop);
	RETURN NEW;
	END
	$$;


ALTER FUNCTION public.billing() OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 57612)
-- Name: cartit(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cartit() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
credit_ bigint;
billno smallint;
para integer;
cartinc smallint;
BEGIN
credit_:=(select card_no from creditcard);
billno:=(select bill_no from bill order by bill_no desc limit 1);
para:=(select totalprice from shop order by shopid desc limit 1);
cartinc:=(select cartid from cart order by cartid desc limit 1)+1;
INSERT INTO cart(cartid,card_no,bill_no,price) VALUES (cartinc,credit_,billno,para);
RETURN NEW;
END;
$$;


ALTER FUNCTION public.cartit() OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 57407)
-- Name: log_shop(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.log_shop() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
 declare
 shop_id integer;
 begin
 shop_id:=(select shopid from shop order by shopid desc limit 1) ;
 update users set shopid=shop_id;
return new;
end;
$$;


ALTER FUNCTION public.log_shop() OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 57615)
-- Name: mboardcheck(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mboardcheck() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
cpusoc character varying;
mboardsoc character varying;
shopinfo integer;
BEGIN
shopinfo:=(select cpu from shop where shopid=1);
cpusoc:=(select cpusocket from cpu where id=shopinfo);
shopinfo:=(select mboard from shop where shopid=1);
mboardsoc:=(select msocket from mboard where id=shopinfo);

IF mboardsoc <> cpusoc THEN
UPDATE shop set mboard=NULL where shopid=1;
END IF;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.mboardcheck() OWNER TO postgres;

--
-- TOC entry 220 (class 1255 OID 57569)
-- Name: payment(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.payment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
payment integer;
BEGIN 
payment:=(select totalprice from shop order by shopid desc limit 1);
IF payment>0 THEN
UPDATE creditcard set card_limit=(card_limit-(payment/2));
END IF;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.payment() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 41000)
-- Name: components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.components (
    id smallint NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.components OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 40998)
-- Name: Components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Components_id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Components_id_seq" OWNER TO postgres;

--
-- TOC entry 3104 (class 0 OID 0)
-- Dependencies: 200
-- Name: Components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Components_id_seq" OWNED BY public.components.id;


--
-- TOC entry 216 (class 1259 OID 57574)
-- Name: bill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill (
    bill_no smallint NOT NULL,
    bill_date character varying,
    shopid smallint NOT NULL
);


ALTER TABLE public.bill OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 57590)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cartid smallint NOT NULL,
    card_no bigint NOT NULL,
    bill_no smallint NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 41014)
-- Name: cooler; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cooler (
    coolmodel character varying(50) NOT NULL,
    coolrpm integer NOT NULL,
    coolnoise integer NOT NULL,
    coolcol character varying(20),
    coolsize integer
)
INHERITS (public.components);


ALTER TABLE public.cooler OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 41010)
-- Name: cpu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cpu (
    cpucorecount integer NOT NULL,
    corecl character varying(10) NOT NULL,
    boostcl character varying(10) NOT NULL,
    cputdp integer NOT NULL,
    cpusocket character varying(12) NOT NULL,
    cpuig boolean NOT NULL,
    cpumodel character varying(36) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.cpu OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 57527)
-- Name: creditcard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.creditcard (
    card_no bigint NOT NULL,
    uid character varying(16),
    card_limit integer
);


ALTER TABLE public.creditcard OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 57525)
-- Name: creditcard_card_no_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.creditcard_card_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.creditcard_card_no_seq OWNER TO postgres;

--
-- TOC entry 3105 (class 0 OID 0)
-- Dependencies: 214
-- Name: creditcard_card_no_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.creditcard_card_no_seq OWNED BY public.creditcard.card_no;


--
-- TOC entry 204 (class 1259 OID 41018)
-- Name: gpu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gpu (
    gmodel character varying(20) NOT NULL,
    gmem integer NOT NULL,
    gcore integer NOT NULL,
    gboost integer NOT NULL,
    gcolor character varying(20) NOT NULL,
    length integer NOT NULL,
    gchip character varying(20) NOT NULL,
    gtdp integer NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.gpu OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 41022)
-- Name: kasa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kasa (
    kasamodel character varying(36) NOT NULL,
    kasatype character varying(36) NOT NULL,
    kasacolor character varying(20) NOT NULL,
    kasapanel character varying(30) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.kasa OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 41026)
-- Name: mboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mboard (
    mmodel character varying(48) NOT NULL,
    msocket character varying(12) NOT NULL,
    mform character varying(12) NOT NULL,
    mmem integer NOT NULL,
    mslots integer NOT NULL,
    mcolor character varying(24) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.mboard OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 41030)
-- Name: monitor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monitor (
    moscr character varying(10) NOT NULL,
    mores character varying(10) NOT NULL,
    morr integer NOT NULL,
    mort integer NOT NULL,
    mopan character varying(5) NOT NULL,
    momodel character varying(40) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.monitor OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 41034)
-- Name: psu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.psu (
    psuform character varying(10) NOT NULL,
    psueff character varying(16) NOT NULL,
    psuwatt integer NOT NULL,
    psumod character varying(10) NOT NULL,
    psucolor character varying(10),
    psumodel character varying(36) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.psu OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 41038)
-- Name: ram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ram (
    rmodel character varying(40) NOT NULL,
    rspeed character varying(20) NOT NULL,
    rmodul character varying(16) NOT NULL,
    rcolor character varying(16) NOT NULL,
    rcas integer NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.ram OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49295)
-- Name: shop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop (
    shopid integer NOT NULL,
    cpu smallint,
    gpu smallint,
    mboard smallint,
    cooler smallint,
    psu smallint,
    ram smallint,
    storage smallint,
    monitor smallint,
    kasa smallint,
    totalprice integer
);


ALTER TABLE public.shop OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 49293)
-- Name: shop_shopid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_shopid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_shopid_seq OWNER TO postgres;

--
-- TOC entry 3106 (class 0 OID 0)
-- Dependencies: 211
-- Name: shop_shopid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_shopid_seq OWNED BY public.shop.shopid;


--
-- TOC entry 210 (class 1259 OID 41042)
-- Name: storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storage (
    stmodel character varying(48) NOT NULL,
    stcap character varying(10) NOT NULL,
    sttype character varying(10) NOT NULL,
    stcache integer,
    stform character varying(24) NOT NULL,
    stinter character varying(20) NOT NULL
)
INHERITS (public.components);


ALTER TABLE public.storage OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 57393)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid character varying(16) NOT NULL,
    shopid smallint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2916 (class 2604 OID 41003)
-- Name: components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2918 (class 2604 OID 41017)
-- Name: cooler id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cooler ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2917 (class 2604 OID 41013)
-- Name: cpu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cpu ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2927 (class 2604 OID 57530)
-- Name: creditcard card_no; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard ALTER COLUMN card_no SET DEFAULT nextval('public.creditcard_card_no_seq'::regclass);


--
-- TOC entry 2919 (class 2604 OID 41021)
-- Name: gpu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gpu ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2920 (class 2604 OID 41025)
-- Name: kasa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kasa ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2921 (class 2604 OID 41029)
-- Name: mboard id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mboard ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2922 (class 2604 OID 41033)
-- Name: monitor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitor ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2923 (class 2604 OID 41037)
-- Name: psu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.psu ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2924 (class 2604 OID 41041)
-- Name: ram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ram ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 2926 (class 2604 OID 49298)
-- Name: shop shopid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop ALTER COLUMN shopid SET DEFAULT nextval('public.shop_shopid_seq'::regclass);


--
-- TOC entry 2925 (class 2604 OID 41045)
-- Name: storage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage ALTER COLUMN id SET DEFAULT nextval('public."Components_id_seq"'::regclass);


--
-- TOC entry 3097 (class 0 OID 57574)
-- Dependencies: 216
-- Data for Name: bill; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill (bill_no, bill_date, shopid) FROM stdin;
1	1	1
2	2021-08-19	14
3	2021-08-19	15
4	2021-08-19	19
5	2021-08-19	20
6	2021-08-19	21
7	2021-08-19	22
8	2021-08-19	23
9	2021-08-19	24
10	2021-08-19	25
11	2021-08-19	26
12	2021-08-19	27
13	2021-08-19	28
14	2021-08-19	29
15	2021-08-19	30
16	2021-08-19	31
17	2021-08-19	38
18	2021-08-19	39
\.


--
-- TOC entry 3098 (class 0 OID 57590)
-- Dependencies: 217
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cartid, card_no, bill_no, price) FROM stdin;
1	1111222233334444	1	1
2	1111222233334444	17	4925
3	1111222233334444	18	4925
\.


--
-- TOC entry 3082 (class 0 OID 41000)
-- Dependencies: 201
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.components (id, price) FROM stdin;
\.


--
-- TOC entry 3084 (class 0 OID 41014)
-- Dependencies: 203
-- Data for Name: cooler; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cooler (id, price, coolmodel, coolrpm, coolnoise, coolcol, coolsize) FROM stdin;
13	25	Cooler Master Hyper 212 EVO	2000	36	\N	\N
14	70	Cooler Master MASTERLIQUID ML240L RGB V2	1800	27	Black	240
15	120	NZXT Kraken X53	2000	36	Black	240
\.


--
-- TOC entry 3083 (class 0 OID 41010)
-- Dependencies: 202
-- Data for Name: cpu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cpu (id, price, cpucorecount, corecl, boostcl, cputdp, cpusocket, cpuig, cpumodel) FROM stdin;
1	288	6	3.8	4.6	65	AM4	f	AMD Ryzen 5600x
3	287	6	3.6	4.2	65	AM4	f	AMD Ryzen 3600
4	570	12	3.7	4.8	105	AM4	f	AMD Ryzen 5900x
2	320	8	3.8	5.1	125	LGA1200	t	Intel i7 - 10700K
5	500	10	3.7	5.3	125	LGA1200	t	Intel i9 - 10900K
6	235	6	3.7	4.6	95	LGA1151	t	Intel i5 - 9600K
\.


--
-- TOC entry 3096 (class 0 OID 57527)
-- Dependencies: 215
-- Data for Name: creditcard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.creditcard (card_no, uid, card_limit) FROM stdin;
1111222233334444	yigittin	6152
\.


--
-- TOC entry 3085 (class 0 OID 41018)
-- Dependencies: 204
-- Data for Name: gpu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gpu (id, price, gmodel, gmem, gcore, gboost, gcolor, length, gchip, gtdp) FROM stdin;
17	880	EVGA XC GAMING	12	1320	1882	Black	201	RTX 3060	170
18	2680	EVGA FTW3	24	1395	1800	Black	300	RTX 3090	350
19	780	Zotac GAMING	6	1365	1680	Black	209	RTX 2060	160
\.


--
-- TOC entry 3086 (class 0 OID 41022)
-- Dependencies: 205
-- Data for Name: kasa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kasa (id, price, kasamodel, kasatype, kasacolor, kasapanel) FROM stdin;
20	75	NZXT H510	ATX Mid Tower	White	Tempered Glass
21	95	Corsair 4000D Airflow	ATX Mid Tower	Black	Tinted Tempered Glass
22	150	Lian Li PC-O11 Dynamic	ATX Full Tower	Black	Tempered Glass
\.


--
-- TOC entry 3087 (class 0 OID 41026)
-- Dependencies: 206
-- Data for Name: mboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mboard (id, price, mmodel, msocket, mform, mmem, mslots, mcolor) FROM stdin;
7	235	Asus TUF GAMING X570-PLUS (WI-FI)	AM4	ATX	128	4	Black / Gold
8	163	Asus ROG STRIX B550-A GAMING	AM4	ATX	128	4	Black / White
9	180	MSI Z490-A PRO	LGA1200	ATX	128	4	Black / Silver
10	380	Asus ROG STRIX Z490-E GAMING	LGA1200	ATX	128	4	Black
11	130	MSI Z390-A PRO	LGA1151	ATX	128	4	Brown / Black
12	225	Gigabyte Z390 AORUS PRO WIFI	LGA1151	ATX	128	4	Black / Silver
\.


--
-- TOC entry 3088 (class 0 OID 41030)
-- Dependencies: 207
-- Data for Name: monitor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monitor (id, price, moscr, mores, morr, mort, mopan, momodel) FROM stdin;
27	300	24"	1080p	144	1	IPS	MSI Optix G241
28	200	24"	1080p	144	1	TN	Asus VG248QG
29	360	27"	2K	165	1	IPS	Asus TUF Gaming VG27AQ
30	850	27"	4K	144	1	IPS	LG 27GN950-B
\.


--
-- TOC entry 3089 (class 0 OID 41034)
-- Dependencies: 208
-- Data for Name: psu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.psu (id, price, psuform, psueff, psuwatt, psumod, psucolor, psumodel) FROM stdin;
23	125	ATX	80+ Gold	750	Full	Black	Corsair RM 2019
24	60	ATX	80+ Bronze	600	Full	\N	EVGA BQ
25	185	SFX	80+ Platinum	750	Full	\N	Corsair SF
26	70	ATX	80+ Bronze	650	Semi	\N	Corsair CXM
\.


--
-- TOC entry 3090 (class 0 OID 41038)
-- Dependencies: 209
-- Data for Name: ram; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ram (id, price, rmodel, rspeed, rmodul, rcolor, rcas) FROM stdin;
32	100	G.Skill Trident Z RGB 16 GB	DDR4-3600	2x8 GB	Black	18
31	78	Corsair Vengeance LPX 16 GB	DDR4-3200	2x8 GB	Black / Yellow	16
33	170	Crucial Ballistix 32 GB	DDR4-3600	2x16 GB	Black	16
\.


--
-- TOC entry 3093 (class 0 OID 49295)
-- Dependencies: 212
-- Data for Name: shop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop (shopid, cpu, gpu, mboard, cooler, psu, ram, storage, monitor, kasa, totalprice) FROM stdin;
19	4	18	7	14	23	32	64	29	21	4291
2	1	17	\N	\N	\N	\N	\N	\N	\N	\N
20	4	18	7	14	23	32	64	29	21	4291
21	4	18	7	14	23	32	64	29	21	4291
3	1	17	7	15	\N	\N	\N	\N	\N	\N
22	4	18	7	14	23	32	64	29	21	4291
4	\N	\N	\N	\N	\N	33	64	28	\N	\N
23	4	18	7	14	23	33	65	\N	\N	4000
24	4	18	7	14	23	33	65	\N	\N	4000
25	4	18	7	14	23	33	65	\N	\N	4000
26	4	18	7	14	23	33	65	\N	\N	4000
27	4	18	7	14	23	33	65	\N	\N	4000
28	4	18	7	14	23	33	65	\N	\N	4000
29	4	18	7	14	23	33	65	\N	\N	4000
30	4	18	7	14	23	33	65	\N	\N	4000
31	4	18	7	14	23	33	65	\N	\N	4000
1	4	18	7	14	23	33	65	30	20	4925
14	4	18	7	14	23	\N	\N	\N	\N	3680
38	4	18	7	14	23	33	65	30	20	4925
39	4	18	7	14	23	33	65	30	20	4925
15	4	18	7	14	23	32	65	29	22	4440
\.


--
-- TOC entry 3091 (class 0 OID 41042)
-- Dependencies: 210
-- Data for Name: storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.storage (id, price, stmodel, stcap, sttype, stcache, stform, stinter) FROM stdin;
64	56	Seagate Barracuda Compute	2 TB	7200RPM	256	3-5"	SATA 6 Gb/s
65	150	Samsung 970 Evo Plus	1 TB	SSD	1024	M.2-2280	M.2(M)
66	32	Kingston A400	240 GB	SSD	1024	2.5"	SATA 6Gb/s
\.


--
-- TOC entry 3094 (class 0 OID 57393)
-- Dependencies: 213
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uid, shopid) FROM stdin;
yigittin	39
\.


--
-- TOC entry 3107 (class 0 OID 0)
-- Dependencies: 200
-- Name: Components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Components_id_seq"', 66, true);


--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 214
-- Name: creditcard_card_no_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.creditcard_card_no_seq', 1, false);


--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 211
-- Name: shop_shopid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_shopid_seq', 39, true);


--
-- TOC entry 2929 (class 2606 OID 41005)
-- Name: components Components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT "Components_pkey" PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 57581)
-- Name: bill bill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_pkey PRIMARY KEY (bill_no);


--
-- TOC entry 2939 (class 2606 OID 57594)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cartid);


--
-- TOC entry 2935 (class 2606 OID 57532)
-- Name: creditcard creditcard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard
    ADD CONSTRAINT creditcard_pkey PRIMARY KEY (card_no);


--
-- TOC entry 2931 (class 2606 OID 49300)
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (shopid);


--
-- TOC entry 2933 (class 2606 OID 57511)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- TOC entry 2947 (class 2620 OID 57609)
-- Name: shop billfill; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER billfill AFTER INSERT ON public.shop FOR EACH STATEMENT EXECUTE FUNCTION public.billing();


--
-- TOC entry 2950 (class 2620 OID 57613)
-- Name: bill cartadd; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER cartadd AFTER INSERT ON public.bill FOR EACH ROW EXECUTE FUNCTION public.cartit();


--
-- TOC entry 2948 (class 2620 OID 57616)
-- Name: shop mbcheck; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER mbcheck AFTER UPDATE ON public.shop FOR EACH ROW EXECUTE FUNCTION public.mboardcheck();


--
-- TOC entry 2949 (class 2620 OID 57610)
-- Name: bill payit; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER payit AFTER INSERT ON public.bill FOR EACH STATEMENT EXECUTE FUNCTION public.payment();


--
-- TOC entry 2946 (class 2620 OID 57570)
-- Name: shop paymenttrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER paymenttrigger AFTER INSERT ON public.shop FOR EACH ROW EXECUTE FUNCTION public.payment();


--
-- TOC entry 2945 (class 2620 OID 57408)
-- Name: shop userlog; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER userlog AFTER INSERT ON public.shop FOR EACH ROW EXECUTE FUNCTION public.log_shop();


--
-- TOC entry 2943 (class 2606 OID 57595)
-- Name: cart fk_bill; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_bill FOREIGN KEY (bill_no) REFERENCES public.bill(bill_no);


--
-- TOC entry 2944 (class 2606 OID 57600)
-- Name: cart fk_card; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_card FOREIGN KEY (card_no) REFERENCES public.creditcard(card_no);


--
-- TOC entry 2940 (class 2606 OID 57401)
-- Name: users fk_shop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_shop FOREIGN KEY (shopid) REFERENCES public.shop(shopid);


--
-- TOC entry 2942 (class 2606 OID 57582)
-- Name: bill fk_shop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT fk_shop FOREIGN KEY (shopid) REFERENCES public.shop(shopid);


--
-- TOC entry 2941 (class 2606 OID 57533)
-- Name: creditcard fk_uid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.creditcard
    ADD CONSTRAINT fk_uid FOREIGN KEY (uid) REFERENCES public.users(uid);


-- Completed on 2021-08-19 23:49:00

--
-- PostgreSQL database dump complete
--

