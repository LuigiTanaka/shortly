--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "linksCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "userId", url, "shortUrl", "visitCount", "createdAt") FROM stdin;
2	1	https://www.google.com.br/	911d9f5f	0	2022-08-05
4	2	https://www.instagram.com.br/	1ab077b1	2	2022-08-05
5	2	https://www.driven.com.br/	87ccaf12	1	2022-08-05
1	1	https://www.driven.com.br/	eb2630cf	4	2022-08-05
6	4	https://www.respondeai.com/	3c8cd073	0	2022-08-05
7	4	https://www.driven.com/	02804ff3	0	2022-08-05
8	4	https://www.google.com/	33b0465a	0	2022-08-05
10	2	https://www.facebook.com/	0fd97388	1	2022-08-05
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "linksCount", "createdAt") FROM stdin;
1	ana	ana@gmail.com	$2b$10$1LYsd44jNmq.i8RpyvIroO0Am3oQA1NaPygCclWi.7Dpi99wzbCsu	2	2022-08-05
5	4	4@gmail.com	$2b$10$mOAitCGi/Ah3Y8ZHx//IuedJxSJSfMLGUVzFMa8xrRaZznwE.KAzi	0	2022-08-05
6	5	5@gmail.com	$2b$10$6.t2KgpF.9E../7Qa.Xe.en1uamizyqX/h1aMfjhrXff6FzL/fmZa	0	2022-08-05
7	6	6@gmail.com	$2b$10$bwXsBnvh4HcwAazQ21s0S.Sdz5wk6U9z9Q2195DKTKwcqeIRJ/jL6	0	2022-08-05
8	7	7@gmail.com	$2b$10$jKz8/NwDGWjdxjR2zSg6T./KYqXb9gz/P.KA5cd6CwCGsSzJoz5ea	0	2022-08-05
9	8	8@gmail.com	$2b$10$nGB6KTVCCtrdqZTpAHM/SO4cuBqwkIsiU/2WJfIvzUZyWbAO0kdAq	0	2022-08-05
10	9	9@gmail.com	$2b$10$oYR1lU21AD3s.RpFYssQ5eB1fcvrTk0WknZDyZFSDh16XwhZA6tzq	0	2022-08-05
11	10	10@gmail.com	$2b$10$ibEAozzwMM2vZ1HiiB6flO.Nm8p2uGGRW9VHJeb1awm.7acmkD8wO	0	2022-08-05
12	11	11@gmail.com	$2b$10$pQv02Dq8N5gnzb9dirmbzu1ZCWHZY2qXG0aLO0bdyJoNaY5LzvWQe	0	2022-08-05
2	luigi	luigi@gmail.com	$2b$10$mTqciVs36fVZ2rD1qmABRureYlrNWiPGcYlMPrerB2HfQkUl/A9jS	3	2022-08-05
4	pedro	pedro@gmail.com	$2b$10$fzad9hNUPwZAARoZMWwoU.j7w65IEDJJSS6hOw3Cax5AAN3.EikQK	3	2022-08-05
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

