import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d16a3a35-ecd0-48f7-b498-f0b32446582c', '1Annabell.Gleason@hotmail.com', 'Mehmet Kaya', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv101', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('df13a2f8-02da-4ee3-b633-62d44b0352d8', '10Anya_McDermott@yahoo.com', 'Ali Ylmaz', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv123', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d8986599-170c-42a2-afeb-178ae804eb0c', '19Danielle.Little@gmail.com', 'Ali Ylmaz', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv112', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('dd3c2448-2525-403d-ab3b-f581de7854b0', '28Ernestina_Parker4@hotmail.com', 'Ali Ylmaz', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv101', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('7a1730e1-cfc3-4dcd-ba36-0e00068ef141', '37Christiana_Sipes@hotmail.com', 'Ali Ylmaz', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv112', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('20fb4a6e-5723-4833-8219-e35e6ff36e2e', '55Bettie.Morissette@gmail.com', 'Fatma elik', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv101', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('9fe50af0-ccf9-4b27-9c3e-7653c584d1ea', '64Dedric_Batz@gmail.com', 'Fatma elik', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv101', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d17156fd-189a-4b81-8ff9-063a98b867fc', '73Betsy14@hotmail.com', 'Ali Ylmaz', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv123', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('a43db79c-f794-4342-bca1-060a5edef623', '82Mose.Weber27@yahoo.com', 'Hasan z', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv101', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "City" ("id", "name", "region") VALUES ('30126d64-292c-4f43-8c20-93a21c43dfe4', 'Antalya', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('efbb3400-5873-49d5-8e00-a0eb0e5d8198', 'stanbul', 'Ege');
INSERT INTO "City" ("id", "name", "region") VALUES ('5397e7b3-0232-44c1-83f1-8f467f33ed58', 'zmir', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('60aff1da-b03b-46eb-b6fa-8ee2fcb9ae02', 'zmir', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('635c4dde-76c5-46e7-9a09-0a9ff42d9429', 'Ankara', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('36d9e5a4-95a5-4f28-adcc-e462a4fab2fb', 'stanbul', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('dc38894c-8493-4b54-bee3-c08fe3b75012', 'Antalya', 'Marmara');
INSERT INTO "City" ("id", "name", "region") VALUES ('6e062bd9-4586-432a-8df1-b4acbd7e9962', 'Ankara', ' Anadolu');
INSERT INTO "City" ("id", "name", "region") VALUES ('f72b1e27-2e35-4630-bb13-2671dda33a57', 'stanbul', 'Ege');
INSERT INTO "City" ("id", "name", "region") VALUES ('7b642017-83c1-4e10-b20e-e40be425f5ab', 'stanbul', 'Akdeniz');

INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('dd7f4ccd-739d-4fe0-9689-b5a6e180bfa5', 'Ev Yapm Reel', 'Evde yaplm katksz ilek reeli', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('2f2623cd-0a14-496a-a7a4-50bab6482240', 'Kurutulmu Domates', 'Evde yaplm katksz ilek reeli', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('e1ad2f1c-f924-4c70-ba95-43d6209ca08f', 'Ev Yapm Reel', 'Evde yaplm katksz ilek reeli', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('f20dc834-a9ef-4308-a198-210ae61352f9', 'Doal Zeytinya', 'Doal yaylalardan toplanm iek bal', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('3bad67f1-8662-4772-a77f-0f66c9cd8d8b', 'Taze Ky Yumurtas', 'Kyde yetitirilmi tavuklardan taze yumurta', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('e0b73dda-e9d8-46a1-a571-dd340d5a0017', 'Doal Zeytinya', 'Kyde yetitirilmi tavuklardan taze yumurta', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('b7b03a01-5d87-4e75-a3a9-4323fc6d897c', 'Taze Ky Yumurtas', 'Kyde yetitirilmi tavuklardan taze yumurta', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('ae63ab7d-e9c6-4235-b107-570382a2610b', 'Kurutulmu Domates', 'Doal yaylalardan toplanm iek bal', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('14e8bae0-2a72-4257-9ecf-6311233456fc', 'Doal Zeytinya', 'Souk skm doal zeytinya', 'Gda');
INSERT INTO "Product" ("id", "name", "description", "category") VALUES ('977fc81f-27c5-4e3b-b3b5-27352a6fe937', 'Organik Bal', 'Doal yaylalardan toplanm iek bal', 'Gda');

INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('60d33eee-9f7a-4c99-9870-a35c05894b3b', '2024-06-16T06:00:33.397Z', '2024-10-06T16:20:22.584Z', 'Yolda', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', '7b642017-83c1-4e10-b20e-e40be425f5ab', '635c4dde-76c5-46e7-9a09-0a9ff42d9429');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('4d123835-5910-453c-9e12-6c5fde2eca43', '2024-07-12T13:24:04.683Z', '2024-11-06T05:01:51.168Z', 'Beklemede', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '60aff1da-b03b-46eb-b6fa-8ee2fcb9ae02', '7b642017-83c1-4e10-b20e-e40be425f5ab');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('c1edf93d-76b9-4ac5-8d95-5804a2728f25', '2025-03-08T07:11:52.816Z', '2025-06-02T16:59:24.744Z', 'Yolda', 'd17156fd-189a-4b81-8ff9-063a98b867fc', 'f72b1e27-2e35-4630-bb13-2671dda33a57', '635c4dde-76c5-46e7-9a09-0a9ff42d9429');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('a73f4fb4-5cc7-46f4-a24c-74c70457a7cc', '2024-12-30T23:38:36.499Z', '2025-06-02T12:13:25.975Z', 'Tamamland', '9fe50af0-ccf9-4b27-9c3e-7653c584d1ea', 'efbb3400-5873-49d5-8e00-a0eb0e5d8198', 'f72b1e27-2e35-4630-bb13-2671dda33a57');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('0bd0c9a7-903f-4bc4-9814-6c44ac78d54b', '2024-07-27T12:44:00.313Z', '2024-10-30T20:21:22.992Z', 'Beklemede', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', 'efbb3400-5873-49d5-8e00-a0eb0e5d8198', 'dc38894c-8493-4b54-bee3-c08fe3b75012');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('499ed34e-550b-4c80-a274-9d8e6cea6305', '2024-09-11T18:12:37.022Z', '2024-07-10T14:25:01.135Z', 'Tamamland', 'd8986599-170c-42a2-afeb-178ae804eb0c', '36d9e5a4-95a5-4f28-adcc-e462a4fab2fb', 'dc38894c-8493-4b54-bee3-c08fe3b75012');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('ddbcf0a4-2035-49bb-9d50-eef5469727ae', '2024-06-26T16:01:12.374Z', '2024-01-08T21:57:42.278Z', 'Yolda', 'd8986599-170c-42a2-afeb-178ae804eb0c', '60aff1da-b03b-46eb-b6fa-8ee2fcb9ae02', 'efbb3400-5873-49d5-8e00-a0eb0e5d8198');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('383f68e6-a5f0-4307-8454-cdf6f1713c90', '2023-12-27T23:23:08.701Z', '2025-05-09T08:35:43.735Z', 'Hazrlanyor', 'd8986599-170c-42a2-afeb-178ae804eb0c', '30126d64-292c-4f43-8c20-93a21c43dfe4', '635c4dde-76c5-46e7-9a09-0a9ff42d9429');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('e0991a85-e720-45a0-83ff-20490e29a377', '2025-09-16T05:12:47.814Z', '2024-05-04T14:16:53.790Z', 'Tamamland', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', 'f72b1e27-2e35-4630-bb13-2671dda33a57', 'dc38894c-8493-4b54-bee3-c08fe3b75012');
INSERT INTO "Trip" ("id", "departureDate", "arrivalDate", "status", "userId", "originCityId", "destinationCityId") VALUES ('221ba56f-0dba-4a17-bdd4-aabf3dc662b9', '2024-04-23T04:47:59.555Z', '2024-06-17T15:42:48.638Z', 'Beklemede', 'd17156fd-189a-4b81-8ff9-063a98b867fc', '30126d64-292c-4f43-8c20-93a21c43dfe4', '7b642017-83c1-4e10-b20e-e40be425f5ab');

INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('8666c7b8-0432-4369-b380-bb3c5152f357', 20, 826, 'ptal Edildi', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'f20dc834-a9ef-4308-a198-210ae61352f9', '499ed34e-550b-4c80-a274-9d8e6cea6305');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('5f1e8610-4e3b-40c0-8394-3f02fed89d9a', 772, 768, 'Beklemede', '20fb4a6e-5723-4833-8219-e35e6ff36e2e', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'dd7f4ccd-739d-4fe0-9689-b5a6e180bfa5', '383f68e6-a5f0-4307-8454-cdf6f1713c90');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('b193d2d9-2d35-4c24-b2e9-55c415aef348', 220, 476, 'Beklemede', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ae63ab7d-e9c6-4235-b107-570382a2610b', '221ba56f-0dba-4a17-bdd4-aabf3dc662b9');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('75a6515d-daab-4942-855a-e731d4e80432', 474, 735, 'Beklemede', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', '20fb4a6e-5723-4833-8219-e35e6ff36e2e', 'e1ad2f1c-f924-4c70-ba95-43d6209ca08f', 'e0991a85-e720-45a0-83ff-20490e29a377');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('b160f729-d26d-4981-984f-9a70e62b8cba', 701, 492, 'Hazrlanyor', 'a43db79c-f794-4342-bca1-060a5edef623', 'd8986599-170c-42a2-afeb-178ae804eb0c', 'f20dc834-a9ef-4308-a198-210ae61352f9', 'ddbcf0a4-2035-49bb-9d50-eef5469727ae');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('3ed44124-d65e-4b25-9b1d-2dcaf661afbd', 905, 607, 'Hazrlanyor', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'ae63ab7d-e9c6-4235-b107-570382a2610b', '60d33eee-9f7a-4c99-9870-a35c05894b3b');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('0c0e6154-2ad8-4318-9224-c2cc72456817', 545, 770, 'Teslim Edildi', '9fe50af0-ccf9-4b27-9c3e-7653c584d1ea', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'dd7f4ccd-739d-4fe0-9689-b5a6e180bfa5', 'c1edf93d-76b9-4ac5-8d95-5804a2728f25');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('85abff3d-1e0d-4120-b1c8-a36abb7a88f9', 250, 576, 'Yolda', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '3bad67f1-8662-4772-a77f-0f66c9cd8d8b', '0bd0c9a7-903f-4bc4-9814-6c44ac78d54b');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('ddb40040-55d1-4ca3-b4e1-d82940d233b4', 718, 209, 'Teslim Edildi', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'a43db79c-f794-4342-bca1-060a5edef623', 'b7b03a01-5d87-4e75-a3a9-4323fc6d897c', '499ed34e-550b-4c80-a274-9d8e6cea6305');
INSERT INTO "Order" ("id", "quantity", "price", "status", "buyerId", "sellerId", "productId", "tripId") VALUES ('53bfceb8-ae49-4f33-b2cb-1ca0802bb0e3', 217, 400, 'Yolda', '20fb4a6e-5723-4833-8219-e35e6ff36e2e', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'e0b73dda-e9d8-46a1-a571-dd340d5a0017', 'c1edf93d-76b9-4ac5-8d95-5804a2728f25');

INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('03cbc8f3-cfc4-45bb-9e11-1fa0a3fc753a', 157, 'Paketleme ktyd rn zarar grm.', 'd17156fd-189a-4b81-8ff9-063a98b867fc', 'd8986599-170c-42a2-afeb-178ae804eb0c', '5f1e8610-4e3b-40c0-8394-3f02fed89d9a');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('a31afa1c-a1ec-429b-b0d1-9042147f391c', 979, 'rn ok hzl geldi teekkrler', 'd8986599-170c-42a2-afeb-178ae804eb0c', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '0c0e6154-2ad8-4318-9224-c2cc72456817');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('8b7f6ba0-f494-4005-b16a-06dd6658d99a', 483, 'Pek memnun kalmadm daha iyi olabilirdi.', 'a43db79c-f794-4342-bca1-060a5edef623', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'ddb40040-55d1-4ca3-b4e1-d82940d233b4');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('743dc7c4-889c-4fb7-86fb-d11e07622bc4', 817, 'Kaliteli rn tavsiye ederim.', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'd17156fd-189a-4b81-8ff9-063a98b867fc', '3ed44124-d65e-4b25-9b1d-2dcaf661afbd');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('c4d92e64-915e-4387-a075-df13ed295f13', 623, 'rn ok hzl geldi teekkrler', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '0c0e6154-2ad8-4318-9224-c2cc72456817');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('b39c9980-e419-4aba-b541-886ff75190ed', 430, 'Paketleme ktyd rn zarar grm.', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'd17156fd-189a-4b81-8ff9-063a98b867fc', 'b160f729-d26d-4981-984f-9a70e62b8cba');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('bc2c9583-9de4-488f-ae43-93871612b465', 907, 'Kaliteli rn tavsiye ederim.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '5f1e8610-4e3b-40c0-8394-3f02fed89d9a');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('b49deb82-b1b6-470f-9f9b-1787e473d16d', 631, 'Kaliteli rn tavsiye ederim.', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', '53bfceb8-ae49-4f33-b2cb-1ca0802bb0e3');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('9bb8dfa1-6927-4c0f-a2e2-7f8898d13039', 611, 'Pek memnun kalmadm daha iyi olabilirdi.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'dd3c2448-2525-403d-ab3b-f581de7854b0', 'ddb40040-55d1-4ca3-b4e1-d82940d233b4');
INSERT INTO "Review" ("id", "rating", "comment", "reviewerId", "revieweeId", "orderId") VALUES ('33aca255-40f0-4c81-9664-4176622b7bf9', 517, 'Pek memnun kalmadm daha iyi olabilirdi.', 'df13a2f8-02da-4ee3-b633-62d44b0352d8', '9fe50af0-ccf9-4b27-9c3e-7653c584d1ea', '85abff3d-1e0d-4120-b1c8-a36abb7a88f9');

INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('239edfbb-74a3-4202-8bc2-7b713ab273fb', 'rn teslim ettiimde size haber vereceim.', '2024-03-11T02:42:04.478Z', 'd17156fd-189a-4b81-8ff9-063a98b867fc', 'd17156fd-189a-4b81-8ff9-063a98b867fc');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('8da4e9e9-bf2e-4e39-a1ac-e6f8597ef609', 'rn teslim ettiimde size haber vereceim.', '2024-06-21T11:44:05.925Z', '9fe50af0-ccf9-4b27-9c3e-7653c584d1ea', 'd8986599-170c-42a2-afeb-178ae804eb0c');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('7c897eb4-ce34-4b9e-8be0-d588c7f7294e', 'rn teslim ettiimde size haber vereceim.', '2024-02-08T12:42:50.613Z', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', 'a43db79c-f794-4342-bca1-060a5edef623');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('3c7247c1-ac34-4e0c-89ba-cc30d1896014', 'Yolculuk planmda bir deiiklik oldu rn yarn teslim edebilirim.', '2024-10-22T16:46:00.462Z', 'dd3c2448-2525-403d-ab3b-f581de7854b0', '9fe50af0-ccf9-4b27-9c3e-7653c584d1ea');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('369772d3-63d3-40a3-bf0c-9b655da9d707', 'Merhaba rnnz teslim aldm.', '2024-11-28T17:48:40.284Z', '20fb4a6e-5723-4833-8219-e35e6ff36e2e', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('eedca52a-7e33-4321-9500-10b2b0829cd9', 'Yolculuk planmda bir deiiklik oldu rn yarn teslim edebilirim.', '2024-03-23T00:54:02.842Z', 'a43db79c-f794-4342-bca1-060a5edef623', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('6cbb21c3-7cec-4172-bd20-ec8e178b56bc', 'Yolculuk planmda bir deiiklik oldu rn yarn teslim edebilirim.', '2025-09-04T00:32:56.235Z', 'd16a3a35-ecd0-48f7-b498-f0b32446582c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('50d3937d-e912-4402-a257-84b3f63eb76d', 'Yolculuk planmda bir deiiklik oldu rn yarn teslim edebilirim.', '2025-09-08T03:30:00.455Z', '7a1730e1-cfc3-4dcd-ba36-0e00068ef141', 'd17156fd-189a-4b81-8ff9-063a98b867fc');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('4ddb0486-27b5-4a90-830e-2fdd7bf60b78', 'Doal rnleriniz iin teekkr ederim ok beendim.', '2024-10-17T00:12:32.610Z', '20fb4a6e-5723-4833-8219-e35e6ff36e2e', 'dd3c2448-2525-403d-ab3b-f581de7854b0');
INSERT INTO "Message" ("id", "content", "timestamp", "senderId", "receiverId") VALUES ('15aeb198-d922-4a06-8704-861b7de89bb0', 'Merhaba rnnz teslim aldm.', '2025-06-09T09:10:12.821Z', 'dd3c2448-2525-403d-ab3b-f581de7854b0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
