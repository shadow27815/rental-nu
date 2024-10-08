PGDMP  9                    |            mydb    16.3    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    18494    mydb    DATABASE     v   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Thai_Thailand.874';
    DROP DATABASE mydb;
                postgres    false                        2615    18585    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            W           1247    26935    TenantStatus    TYPE     ]   CREATE TYPE public."TenantStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 !   DROP TYPE public."TenantStatus";
       public          postgres    false    5            �            1259    18597    Product    TABLE     �  CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    detail text,
    price integer,
    location text,
    file text DEFAULT 'noimage.jpg'::text NOT NULL,
    "tenantId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'ว่าง'::text NOT NULL
);
    DROP TABLE public."Product";
       public         heap    postgres    false    5            �            1259    18606    Tenant    TABLE     f  CREATE TABLE public."Tenant" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    message text,
    slip text,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status public."TenantStatus" DEFAULT 'PENDING'::public."TenantStatus" NOT NULL
);
    DROP TABLE public."Tenant";
       public         heap    postgres    false    855    855    5            �            1259    18615    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    password text,
    role text DEFAULT 'user'::text NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    5            �            1259    18586    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �          0    18597    Product 
   TABLE DATA           z   COPY public."Product" (id, name, detail, price, location, file, "tenantId", "createdAt", "updatedAt", status) FROM stdin;
    public          postgres    false    216   �       �          0    18606    Tenant 
   TABLE DATA           i   COPY public."Tenant" (id, name, email, phone, message, slip, "startDate", "endDate", status) FROM stdin;
    public          postgres    false    217   �                  0    18615    User 
   TABLE DATA           :   COPY public."User" (id, name, password, role) FROM stdin;
    public          postgres    false    218   �       �          0    18586    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �       h           2606    18605    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            postgres    false    216            j           2606    18614    Tenant Tenant_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Tenant" DROP CONSTRAINT "Tenant_pkey";
       public            postgres    false    217            l           2606    18623    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    218            f           2606    18594 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            m           2606    18624    Product Product_tenantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_tenantId_fkey";
       public          postgres    false    216    217    4714            �   "  x����j�@�kݧ��23;���EZCܹ�J�t!�C�&&�	�q.!!�M��j�_d%{e�55G����o��ڨ08�ܓ`lI�࡜�{˃-/UN_���6�7������PuNW9�r��~��Ә�uN���~���ӏIw��Y����ɳ'Z2�ѣq����>��Oz1�nһI�'�,:���vҫ��Ԃ�jTLh䫗/����\s�JO�u�U��D0q0d�P�.�������S�wB�JzK�����r�xho|���9]��mil�5�n� Tl���Zh�бB�s�����WH�@� ���1"b齙!��xi&D_��ݐ�P����$H�-�h����h���1L4�S+1A�����
�4��$��L�HAXS֑[" ac@3th��9^d��1��̦�/2Q(�N��D7@��9�&r�����':Ѷ��J����Q�0G�W��G@���a���xMt	�d�L �zːK~k��|ld��8g�V�d�	د�d�:�U�o��C�R�N��19�����ܰ      �   �   x�K262OK2��5IM6�5��H�M4NM�53K50KM332OL�L�H�,O,Q(H��.*ML����sH�M���K���40426153���455�447251255�0�0����s�w�q
��?��ЎC���b0�L.����R0� Ln����CH����E`rf<Xz��&'���`r"D<�T/� �����D�U+0����"����\]�b���� e��          �  x�5�ɲ�0��>��IBBX
N�,
�u7����Q��r��w�W���"�MK��8����1'�I�%E��&��A��?k��|��:G���Mj2M���mX�^�k�g7��sڟ��nZ�W�!�8�E1�f��1����)�=	�Xፉ[����EpY�9݅�;�FZ�{��s	�8�^�A/�̗�	Q��ӡh+b��Nda,�h����RA&�p �o�󮌲%�N��x���N�U�>�+7(��%K���s�y-땗�;N?�),u����N(�)jShc*��������5��U5
�����3=�$ѻ{�?~���]�k�O�xRy��ߎ�4	0�0�L&�B A���a��OG��|8����m���b���F����^}�ˆ��t<�����}�"�R�hγ$m.C�\!�����{�~��Xw.���Q��q5��*\��ad�I}<�����^:3nƫ��+8Ϟ��n��͢�u      �   �  x����j[Y�;O���1���-�!��}��i��?r������������Q��жՍxk��V{+1�9v&� k+}ؐeF�^�Um�"���,h�*����jJkG@��m�_P��='ҿ��|F
&�z�1�O�8=?O�����N�o_ϏO� ����)�.��;������T��u�� ����b��}V��QJm�9�;��n4���H�5�Z���QQ��X�{/���
���������g��8����0�ޮ������xKx5�����'�\I�O6,��PV�H�s-i���u ��>�����Sc���А��Qk8�"���¾ H���� ��hPH_i�O����pI[.u�Zӹ5캝�lM<�Qh q�r��n��ޘg�U����F�4g�yC���ލ�GX�r��B�=��Fb{��و��)��xa��R�׆�WZ�e����vl<�kpj��SL�bV�F_s);�L�F�̢y�$�:kL�l_��a���Y�P8S�{>�^q^X������������T.f0n�T��mO�-b�V�@���v��꣫Y��ùAi:2��V:$���Ѽe�tg���&����'D�s ��:}ڥO��灔��7�&��>s�u�� l���ة�θ3NI[z�<�Ɜ�-0�䒠V�"���d`6����ܨy�,{�ZA���,yI�'z��w��B���,���ͻD�=�ie i�(�!�g?Z��W( �E��\!.�V��V*,�kt�W�A9WZꡔ�e\��䙋"�����x?��5���;Ņf�F�Zئ��qǞ�|��A^ؼ�]�	(W4��=oA#oM�]�0�#dЪ�.��w�	cB�]�A;ߪ��������������\p������cX�     