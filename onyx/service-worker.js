// Service worker for progressive web app 
// caches files locally
// based upon https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers

const cache_name = "onyx-nail-v27";

const files_to_cache = [
"/ai/onyx/dev.html",
"/ai/css/ai-teacher-guide.css",
"/ai/js/load-scripts.js",
"/ai/js/tfjs.js",
"/ai/js/tfjs-vis.js",
"/ai/js/mobilenet.js",
"/ai/onyx/korean.js",
"/ai/onyx/korean-tests-166-each.js",
"/ai/js/user-agent.js",
"/ai/onyx/nails.js",
"/ai/onyx/md5-min.js",
"/ai/onyx/train.js",
"/ai/js/mobilenet_v2_100_224/classification/2/model.json?tfjs-format=file",
"/ai/js/mobilenet_v2_100_224/classification/2/group1-shard1of4?tfjs-format=file",
"/ai/js/mobilenet_v2_100_224/classification/2/group1-shard2of4?tfjs-format=file",
"/ai/js/mobilenet_v2_100_224/classification/2/group1-shard3of4?tfjs-format=file",
"/ai/js/mobilenet_v2_100_224/classification/2/group1-shard4of4?tfjs-format=file",
"/ai/onyx/models/15-08-2019b.json",
"/ai/onyx/models/15-08-2019b.weights.bin",
"/ai/onyx/icons/icon-32.png",
"/ai/onyx/onyx-nails.webmanifest",

"images/korean/normalnail/semisuper_161_736_412_1007_683_8718367adab44aed89a0e385b31c8701a08bfbe1.jpg",
"images/korean/normalnail/semisuper_1637_248_410_500_661_OnychomyEndonyx4.jpg",
"images/korean/normalnail/semisuper_1694_14_382_270_646_Turkey-Germany-178.jpg",
"images/korean/normalnail/semisuper_1730_539_193_769_440_ijdvl_2015_81_4_390_157460_f1.jpg",
"images/korean/normalnail/semisuper_1779_46_39_464_457_2012-02-16_005011_fingernail.jpg",
"images/korean/normalnail/semisuper_1832_437_294_644_500_Fungal-Nail-Infection-Onychomycosis-PACT-Treatment.jpg",
"images/korean/normalnail/semisuper_192_356_18_568_231_LEUKONYCHIA-OF-NAILS.jpg",
"images/korean/normalnail/semisuper_1933_467_593_664_789_Psoriasis_nail_knuck1.jpg",
"images/korean/normalnail/semisuper_194_414_99_1195_881_o-NAIL-HEALTH-facebook.jpg",
"images/korean/normalnail/semisuper_1953_474_1075_784_1385_Acopaquia.jpg",
"images/korean/normalnail/semisuper_1966_142_217_611_686_200303fig2.jpg",
"images/korean/normalnail/semisuper_1972_996_971_1192_1168_fold_hand_finger1.jpg",
"images/korean/normalnail/semisuper_2062_783_466_1036_719_4j.jpg",
"images/korean/normalnail/semisuper_209_1029_533_1323_827_029778HB.jpg",
"images/korean/normalnail/semisuper_212_1273_496_1585_808_029778HB.jpg",
"images/korean/normalnail/semisuper_2170_477_531_657_710_median-nail-dystrophy6.jpg",
"images/korean/normalnail/semisuper_218_162_346_406_591_Slide3.JPG",
"images/korean/normalnail/semisuper_2207_878_721_1120_963_026170HB.JPG",
"images/korean/normalnail/semisuper_2232_178_43_683_549_gr4_lrg.jpg",
"images/korean/normalnail/semisuper_2266_304_1019_561_1277_dst30205f1.jpg",
"images/korean/normalnail/semisuper_2279_33_812_302_1068_2.jpg",
"images/korean/normalnail/semisuper_2295_2024_662_3201_1839_2013-06-03_194606_photo.jpg",
"images/korean/normalnail/semisuper_2329_10_462_206_674_melanonychia_1_060721.jpg",
"images/korean/normalnail/semisuper_2351_575_34_977_437_discolored-nail.jpg",
"images/korean/normalnail/semisuper_2363_1038_565_1382_909_MelanomaInSituMISNailD.jpg",
"images/korean/normalnail/semisuper_2404_79_65_382_368_e2f3b7338e73b04fd2bdbe27d8622c3b.jpg",
"images/korean/normalnail/semisuper_242_16_108_308_400_RRNail3.jpg",
"images/korean/normalnail/semisuper_2478_783_1102_1059_1378_all-nails.jpg",
"images/korean/normalnail/semisuper_2533_197_281_359_443_775665-figure-9.jpg",
"images/korean/normalnail/semisuper_2553_18_272_359_712_discolored-nail.jpg",
"images/korean/normalnail/semisuper_28_2149_983_2482_1333_onychomycosis1364420284545.jpg",
"images/korean/normalnail/semisuper_294_723_385_1235_897_029770HB.jpg",
"images/korean/normalnail/semisuper_333_570_64_840_340_beforeandafternail.jpg",
"images/korean/normalnail/semisuper_336_929_256_1505_851_img00336-20120309-10041.jpg",
"images/korean/normalnail/semisuper_346_883_86_1523_726_Peeling-Fingernails.jpg",
"images/korean/normalnail/semisuper_353_20_526_391_936_fig_13j(6).jpg",
"images/korean/normalnail/semisuper_357_464_15_771_286_fig_13j(6).jpg",
"images/korean/normalnail/semisuper_389_569_52_877_359_dlv80056f1.jpg",
"images/korean/normalnail/semisuper_398_503_620_769_886_5581758864e470f4eb13dc.jpg",
"images/korean/normalnail/semisuper_418_183_228_517_563_026484HB.jpg",
"images/korean/normalnail/semisuper_464_1196_682_1410_895_035907HB.jpg",
"images/korean/normalnail/semisuper_483_1233_594_1618_978_036241HB.jpg",
"images/korean/normalnail/semisuper_491_430_328_622_520_fig_6j(19).jpg",
"images/korean/normalnail/semisuper_524_197_320_402_526_skin_transverse_nail2.jpg",
"images/korean/normalnail/semisuper_530_523_179_814_470_nail health.jpg",
"images/korean/normalnail/semisuper_541_191_361_373_543_3yofingABlogo.jpg",
"images/korean/normalnail/semisuper_565_783_1102_1059_1378_all-nails.jpg",
"images/korean/normalnail/semisuper_581_77_216_275_414_Screen Shot 2013-08-13 at 2.54.22 PM.jpg",
"images/korean/normalnail/semisuper_594_772_378_1332_939_025654HB.jpg",
"images/korean/normalnail/semisuper_608_1010_392_1340_723_029777HB.jpg",
"images/korean/normalnail/semisuper_646_26_407_244_625_036253HB.jpg",
"images/korean/normalnail/semisuper_708_514_100_716_303_036924HB.jpg",
"images/korean/normalnail/semisuper_714_783_431_992_640_029779HB.jpg",
"images/korean/normalnail/semisuper_724_337_547_675_884_Ingrownl.jpg",
"images/korean/normalnail/semisuper_770_17_26_329_341_ijdvl_2011_77_6_652_86473_f7.jpg",
"images/korean/normalnail/semisuper_788_9_238_189_421_029775HB.jpg",
"images/korean/normalnail/semisuper_803_1417_1291_1796_1670_leukonychia1.jpg",
"images/korean/normalnail/semisuper_826_40_67_767_1286_1468603.jpg",
"images/korean/normalnail/semisuper_837_484_298_853_667_cardimage_3605523_01347609117527.jpg",
"images/korean/normalnail/semisuper_847_764_373_960_568_fig_5j(16).jpg",
"images/korean/normalnail/semisuper_850_368_296_587_502_nagelpilz-nagelmykose-3750_2.jpg",
"images/korean/normalnail/semisuper_869_249_267_482_501_leukonychia.jpg",
"images/korean/normalnail/semisuper_872_477_176_669_368_leukonychia.jpg",
"images/korean/normalnail/semisuper_908_197_281_359_443_775665-figure-9.jpg",
"images/korean/normalnail/semisuper_934_84_133_264_313_00002227_standalone.jpg",
"images/korean/normalnail/semisuper_960_1209_585_1477_854_037079HB.jpg",
"images/korean/normalnail/semisuper_976_267_701_474_908_026166HB.jpg",
"images/korean/normalnail/semisuper_979_788_546_995_753_026166HB.jpg",
"images/korean/normalnail/semisuper_991_29_762_408_1140_ProximalSubungualonycho.jpg",
"images/korean/normalnail/semisuper_99_676_50_984_357_upper_onycholysis.jpg",
"images/korean/normalnail/semisuper_jpn_105_1462_1029_1891_1459_images_q=tbn_ANd9GcRtiKkGtkJmRTmyIKHJ7-LguFdqL9p1O4dYf4rFCQYqrWiWfQxM.jpg",
"images/korean/normalnail/semisuper_jpn_124_272_202_500_430_5c11b41d.jpg",
"images/korean/normalnail/semisuper_jpn_130_724_23_1160_438_healthy.jpg",
"images/korean/normalnail/semisuper_jpn_136_634_506_1004_949_images_q=tbn_ANd9GcSGvEFD3AeJlpaCX1NI32_a1g_KIxLZrIj77ZMckPVpZGljCZuLVw.jpg",
"images/korean/normalnail/semisuper_jpn_144_76_351_441_715_mizumusiasinoyubi2.jpg",
"images/korean/normalnail/semisuper_jpn_210_628_292_1115_780_.jpg",
"images/korean/normalnail/semisuper_jpn_221_103_308_570_776_images_q=tbn_ANd9GcQl5hZk3LEmm8dp-08msAZrnUe-20d9fAPMRhh-oiJrmL2dGs7V.jpg",
"images/korean/normalnail/semisuper_jpn_276_177_520_412_755_20140215_1001886.jpg",
"images/korean/normalnail/semisuper_jpn_36_294_522_510_738_.jpg",
"images/korean/normalnail/semisuper_jpn_436_928_371_1206_648_tumekyu2.1.jpg",

"images/korean/onychomycosis/semisuper_1004_33_128_283_377_white-om.jpg",
"images/korean/onychomycosis/semisuper_1032_300_191_491_381_200706-fig1.jpg",
"images/korean/onychomycosis/semisuper_1104_352_287_555_490_melanonychia-pictures-3.jpg",
"images/korean/onychomycosis/semisuper_1681_110_195_422_508_pt1015onycho_0.jpg",
"images/korean/onychomycosis/semisuper_1699_1752_123_1973_344_dce70004f1.jpg",
"images/korean/onychomycosis/semisuper_1705_719_770_959_1010_036048HB.JPG",
"images/korean/onychomycosis/semisuper_1716_432_206_701_476_fungal-infection-view-of-the-broken-discoloured-and-poorly-growing-BP4KXY.jpg",
"images/korean/onychomycosis/semisuper_1742_167_362_721_915_Superficial_white_onychomycosis.jpg",
"images/korean/onychomycosis/semisuper_1756_16_13_266_264_2-packs-toe-nail-fungus-cream-onychomycosis-paronychia-toe-nail-slits-infection-finger-ointment-ringworm-of-the-nails.jpg",
"images/korean/onychomycosis/semisuper_1775_208_95_541_428_018_onychomycosis.JPG",
"images/korean/onychomycosis/semisuper_1790_1179_716_1381_918_036049HB.JPG",
"images/korean/onychomycosis/semisuper_1808_581_181_776_376_slide_22.jpg",
"images/korean/onychomycosis/semisuper_1850_413_72_660_319_F1.large.jpg",
"images/korean/onychomycosis/semisuper_1964_63_42_310_289_onych-q.jpg",
"images/korean/onychomycosis/semisuper_19_2244_1263_3088_2106_onychomycosis-extreme-case.jpg",
"images/korean/onychomycosis/semisuper_202_92_121_404_434_2008102307123023.jpg",
"images/korean/onychomycosis/semisuper_2067_196_269_407_469_nail-psoriasis1.jpg",
"images/korean/onychomycosis/semisuper_2110_11_644_224_865_pt0906ce2.jpg",
"images/korean/onychomycosis/semisuper_2206_594_443_937_787_20140613-222859-80939339.jpg",
"images/korean/onychomycosis/semisuper_2377_112_196_639_724_Saruf.jpg",
"images/korean/onychomycosis/semisuper_2425_811_445_1047_681_pt0906ce1.jpg",
"images/korean/onychomycosis/semisuper_2476_43_75_238_271_onycholysis-24.jpg",
"images/korean/onychomycosis/semisuper_2516_628_151_1041_584_fig_10j(9).jpg",
"images/korean/onychomycosis/semisuper_271_20_44_212_235_CIA-75525-F03.jpg",
"images/korean/onychomycosis/semisuper_306_60_409_258_607_DSC05450.jpg",
"images/korean/onychomycosis/semisuper_34_75_80_501_438_distal_subungual_onychomycosis10.jpg",
"images/korean/onychomycosis/semisuper_371_126_81_490_444_036249HB.jpg",
"images/korean/onychomycosis/semisuper_413_428_673_650_894_3073104374e470f4e44ae2.jpg",
"images/korean/onychomycosis/semisuper_453_137_1175_2614_3652_0279703.jpg",
"images/korean/onychomycosis/semisuper_475_799_355_989_551_DSCN0049_lxSl8MZ.max-1000x800.jpg",
"images/korean/onychomycosis/semisuper_496_678_41_1179_542_before_and_after_1.jpg",
"images/korean/onychomycosis/semisuper_557_1079_601_1602_1054_035575HB.jpg",
"images/korean/onychomycosis/semisuper_588_288_89_561_361_funghi-allalluce.jpg",
"images/korean/onychomycosis/semisuper_62_440_108_630_319_Home-Remedies-for-Toenail-Fungus-640x450.jpg",
"images/korean/onychomycosis/semisuper_660_118_331_845_1058_Onycomycosis391.jpg",
"images/korean/onychomycosis/semisuper_670_774_61_1091_377_036641HB.jpg",
"images/korean/onychomycosis/semisuper_680_1236_606_1433_803_037527HB.jpg",
"images/korean/onychomycosis/semisuper_702_25_52_487_513_toe-nail1.jpg",
"images/korean/onychomycosis/semisuper_733_911_895_1867_1851_8422240929_8b1a88f608_o.jpg",
"images/korean/onychomycosis/semisuper_756_76_92_363_379_Neglsopp.jpg",
"images/korean/onychomycosis/semisuper_774_775_984_1004_1214_fig_5a-dj.jpg",
"images/korean/onychomycosis/semisuper_790_993_127_1338_472_fig_22j.jpg",
"images/korean/onychomycosis/semisuper_810_40_211_328_499_fig_7j(10).jpg",
"images/korean/onychomycosis/semisuper_819_395_160_873_637_DSC_0291.jpg",
"images/korean/onychomycosis/semisuper_842_512_1661_1066_2214_img_3644.jpg",
"images/korean/onychomycosis/semisuper_88_408_123_598_313_onychomycosis1.jpg",
"images/korean/onychomycosis/semisuper_90_723_83_1010_370_Extremities_onychomycosis2.jpg",
"images/korean/onychomycosis/semisuper_949_210_645_433_868_036226HB.jpg",
"images/korean/onychomycosis/semisuper_982_30_23_464_448_untitled-14DE964898A148F1687.jpg",
"images/korean/onychomycosis/semisuper_jpn_154_273_190_506_423_i2.450.jpg",
"images/korean/onychomycosis/semisuper_jpn_179_348_173_530_356_b0137309_1919086.jpg",
"images/korean/onychomycosis/semisuper_jpn_430_81_58_366_343_image06b.jpg",
"images/korean/onychomycosis/semisuper_jpn_455_182_99_404_320_201006131604151b2.jpg",
"images/korean/onychomycosis/semisuper_jpn_469_571_130_942_501_DSC_0026.jpg",
"images/korean/onychomycosis/semisuper_jpn_488_495_88_767_360_maxresdefault.jpg",
"images/korean/onychomycosis/semisuper_jpn_523_181_460_889_1168_ban0919-2.jpg",
"images/korean/onychomycosis/semisuper_jpn_552_905_144_1102_341_462d4862.jpg",
"images/korean/onychomycosis/semisuper_jpn_93_326_86_538_299.jpg",
"images/korean/onychomycosis/semisuper_kor_1016_522_272_727_478_2654584_230.jpg",
"images/korean/onychomycosis/semisuper_kor_1043_128_160_303_335_images_q=tbn_ANd9GcS7ma_VXpJ7rXqP7iDsI7jEEUWZmbKYSh6j9XgBXQ0vIi41OP48mw.jpg",
"images/korean/onychomycosis/semisuper_kor_12_86_13_338_255_th_1861A03E4D3922FF162748.jpg",
"images/korean/onychomycosis/semisuper_kor_14_98_312_284_499_th_1861A03E4D3922FF162748.jpg",
"images/korean/onychomycosis/semisuper_kor_227_238_456_443_649_th_id=OIP.O1-tiu1CYgjHemqnCmObcQDOEs&w=152&h=199&c=7&qlt=90&o=4&pid=1.jpg",
"images/korean/onychomycosis/semisuper_kor_275_152_78_410_336_th_497bc116aa26f.jpg",
"images/korean/onychomycosis/semisuper_kor_337_60_106_263_309_images_q=tbn_ANd9GcRl6g_Zelebfxd98q29ZRCB00QLxvif77uyfCA9rR5Ub7Md7FC0.jpg",
"images/korean/onychomycosis/semisuper_kor_386_86_13_338_255_th_1861A03E4D3922FF162748.jpg",
"images/korean/onychomycosis/semisuper_kor_398_19_34_370_385_12.jpg",
"images/korean/onychomycosis/semisuper_kor_456_12_25_240_253_th_21773F505406B38E14CC9F.jpg",
"images/korean/onychomycosis/semisuper_kor_506_1117_29_1575_555_20140514_1400114.jpg",
"images/korean/onychomycosis/semisuper_kor_540_153_72_458_377_images_q=tbn_ANd9GcTpXWJOwbv4QRiSeD7UUhG2rv1IcPwmr7otg5E-sfrJ_2Fh00aLlw.jpg",
"images/korean/onychomycosis/semisuper_kor_563_198_517_497_815_images_q=tbn_ANd9GcRurlZ8QsjogQLpv6AzRZ4KiAyhiLN6iCwmoH67978BlDn_OB6UMg.jpg",
"images/korean/onychomycosis/semisuper_kor_586_522_272_727_478_2654584_230.jpg",
"images/korean/onychomycosis/semisuper_kor_605_152_78_410_336_th_497bc116aa26f.jpg",
"images/korean/onychomycosis/semisuper_kor_624_175_25_356_206_images_q=tbn_ANd9GcQZO8LB_JQHn5Jml3aTNT9o09HaLHzuxsR3XTtowaZKP-x_DCu-.jpg",
"images/korean/onychomycosis/semisuper_kor_653_326_225_514_412_.jpg",
"images/korean/onychomycosis/semisuper_kor_763_606_168_893_455_maxresdefault.jpg",
"images/korean/onychomycosis/semisuper_kor_808_381_36_650_305_.jpg",
"images/korean/onychomycosis/semisuper_kor_839_40_201_255_416_images_q=tbn_ANd9GcSIUugTCvcvUKLVaHGCR63sBcj8lrdwLqL_OLC6r2k7QwA_z9V5.jpg",
"images/korean/onychomycosis/semisuper_kor_924_393_130_596_332_th_237F384957EDCC3C2BAB04.jpg",
"images/korean/onychomycosis/semisuper_kor_953_44_16_221_193_images_q=tbn_ANd9GcQyOJdV-2PD2YfintGCkMERzCg7H6XTOyW22VBR1_TqnAk3ssCZzg.jpg",

"images/korean/melanonychia/semisuper_1075_68_819_573_1324_4072.jpg",
"images/korean/melanonychia/semisuper_1085_175_167_422_474_melanonychia25.jpg",
"images/korean/melanonychia/semisuper_1087_376_89_741_454_melanonychia1.jpg",
"images/korean/melanonychia/semisuper_1090_51_272_518_738_melanonychia-longitudinalis-striata-2.jpg",
"images/korean/melanonychia/semisuper_1093_11_29_220_242_melanonychia10.jpg",
"images/korean/melanonychia/semisuper_1096_155_107_461_413_melanonychia-pictures-2.jpg",
"images/korean/melanonychia/semisuper_1099_597_158_814_375_melanonychia_1_060721.jpg",
"images/korean/melanonychia/semisuper_1102_382_53_690_383_melanonychia5.jpg",
"images/korean/melanonychia/semisuper_1106_132_154_461_484_melanonychia-pictures-5.jpg",
"images/korean/melanonychia/semisuper_1108_85_167_463_545_melanonychia-melanocytaire-naevus-1.jpg",
"images/korean/melanonychia/semisuper_1171_146_14_414_274_440px-HEMORRHAGESUBUNG1.JPG",
"images/korean/melanonychia/semisuper_1258_242_140_511_408_MelanomaInSituMISNailD_800_521_70_http_www.pcds.org.ukeeassetsimgwatermark.gif_0_0_80_r_b_-5_-5_.jpg",
"images/korean/melanonychia/semisuper_1909_559_382_846_686_20140620-182421-66261584.jpg",
"images/korean/melanonychia/semisuper_1917_232_64_465_298_subungual-melanoma-pictures-2.jpg",
"images/korean/melanonychia/semisuper_201_237_72_416_251_L-na07disease-2.jpg",
"images/korean/melanonychia/semisuper_2115_478_273_947_742_MelanomaInSituMISNailD.jpg",
"images/korean/melanonychia/semisuper_2186_258_59_563_365_ca_ss_5m4649_121593.jpg",
"images/korean/melanonychia/semisuper_2192_993_339_1317_663_melanonychia_2_0911161353218708324.jpg",
"images/korean/melanonychia/semisuper_2194_243_430_429_615_m_usat2_c191f003.jpg",
"images/korean/melanonychia/semisuper_2197_203_124_437_358_00002357_standalone.jpg",
"images/korean/melanonychia/semisuper_2204_135_88_529_491_img0051.jpg",
"images/korean/melanonychia/semisuper_2215_547_219_801_472_20140620-182421-66261584.jpg",
"images/korean/melanonychia/semisuper_2220_597_366_1005_774_Longitud_melanonychia23.jpg",
"images/korean/melanonychia/semisuper_2223_232_64_465_298_subungual-melanoma-pictures-2.jpg",
"images/korean/melanonychia/semisuper_2225_653_415_914_676_Frictional_lichenoid_melano1.jpg",
"images/korean/melanonychia/semisuper_2238_175_167_422_474_melanonychia25.jpg",
"images/korean/melanonychia/semisuper_2241_78_207_366_495_advice.melonchia.40.jpg",
"images/korean/melanonychia/semisuper_2245_3062_751_3895_1584_0241902.jpg",
"images/korean/melanonychia/semisuper_2247_499_602_1259_1362_0241902.jpg",
"images/korean/melanonychia/semisuper_2253_1288_875_1820_1407_2013-04-25_024903_thumb_nail.jpg",
"images/korean/melanonychia/semisuper_2259_60_237_480_657_img0084.jpg",
"images/korean/melanonychia/semisuper_2263_36_72_489_525_img0125.jpg",
"images/korean/melanonychia/semisuper_2265_279_304_558_584_dst30205f1.jpg",
"images/korean/melanonychia/semisuper_2270_116_72_344_300_images_q=tbn_ANd9GcTapAc5rFPWG8f7S5PZFifUthsWywyu9es0X0rJLq1lczl1whY1.jpg",
"images/korean/melanonychia/semisuper_2275_69_340_316_587_images_q=tbn_ANd9GcSYlSJ9xJ9SPAS5qoILt4wbkL925wmWf_UHbpI0pL6oX4vTVJV5Bw.jpg",
"images/korean/melanonychia/semisuper_2278_319_748_635_1064_2.jpg",
"images/korean/melanonychia/semisuper_2281_592_87_1127_622_dst90037f3.jpg",
"images/korean/melanonychia/semisuper_2293_68_819_573_1324_4072.JPG",
"images/korean/melanonychia/semisuper_2296_24_32_473_610_images_q=tbn_ANd9GcQ6FszAAw-izao6QI2mKyQLXwlwvhUia4CQ26LGtrwTCw1SpBN64g.jpg",
"images/korean/melanonychia/semisuper_2298_31_107_603_710_melanonychia-longitudinalis-striata-1.jpg",
"images/korean/melanonychia/semisuper_2301_84_194_490_635_img0080.jpg",
"images/korean/melanonychia/semisuper_2303_631_292_846_507_fig_18j(2).jpg",
"images/korean/melanonychia/semisuper_2305_320_96_542_318_images_q=tbn_ANd9GcTED9i55rPQ93qduOeD2aYlpmVjjQGbapzQnvBah95XsVcQg7v0.jpg",
"images/korean/melanonychia/semisuper_2320_901_452_1179_730_FrictionalMelanosis.jpg",
"images/korean/melanonychia/semisuper_2322_453_34_1071_653_dst90037f5.jpg",
"images/korean/melanonychia/semisuper_2327_240_142_428_330_melanonychia_1_060721.jpg",
"images/korean/melanonychia/semisuper_2333_18_444_344_706_slide_14.jpg",
"images/korean/melanonychia/semisuper_2335_35_34_669_665_dof130136f1.jpg",
"images/korean/melanonychia/semisuper_2339_132_154_461_484_melanonychia-pictures-5.jpg",
"images/korean/melanonychia/semisuper_2348_302_141_500_339_00002227_standalone.jpg",
"images/korean/melanonychia/semisuper_2358_508_101_806_397_fig_15j(3).jpg",
"images/korean/melanonychia/semisuper_2360_874_84_1164_374_fig_15j(3).jpg",
"images/korean/melanonychia/semisuper_2365_1115_561_2450_1896_images_q=tbn_ANd9GcSWpesIiCcMcvE9K74hTQ2T5D5ZNHmrfO3WVXTaClTr5LEN-5r3.jpg",
"images/korean/melanonychia/semisuper_2369_200_351_444_595_dof130136.pdf.jpg",
"images/korean/melanonychia/semisuper_2374_382_17_627_325_sddefault.jpg",
"images/korean/melanonychia/semisuper_238_197_472_392_667_4d1a54742e76ae671547a665d40197c1.jpg",
"images/korean/melanonychia/semisuper_246_550_1932_2138_3520_0241911.jpg",
"images/korean/melanonychia/semisuper_308_611_22_878_289_JCutanAesthetSurg_2011_4_3_167_91247_f4.jpg",
"images/korean/melanonychia/semisuper_329_145_259_532_645_usat2_c191f007.jpg",
"images/korean/melanonychia/semisuper_347_261_45_616_401_nejmicm1005706_f1.jpg",
"images/korean/melanonychia/semisuper_382_133_23_615_444_subunguaal-melanoom-4.jpg",
"images/korean/melanonychia/semisuper_481_146_13_367_234_23zeusxirdco7tf8pg978h0i.jpg",
"images/korean/melanonychia/semisuper_536_560_334_806_580_LM 1.jpg",
"images/korean/melanonychia/semisuper_595_185_91_592_490_3945438029969defb1ca4bae96920d34.jpg",
"images/korean/melanonychia/semisuper_614_631_292_846_507_fig_18j(2).jpg",
"images/korean/melanonychia/semisuper_759_228_96_841_709_Figure-1j.jpg",
"images/korean/melanonychia/semisuper_767_117_151_486_519_952186.fig.003.jpg",
"images/korean/melanonychia/semisuper_880_282_40_563_322_00001775_standalone.jpg",
"images/korean/melanonychia/semisuper_915_447_454_678_686_036976HB.jpg",
"images/korean/melanonychia/semisuper_933_302_141_500_339_00002227_standalone.jpg",
"images/korean/melanonychia/semisuper_994_127_72_350_295_952186.fig.007.jpg",
"images/korean/melanonychia/semisuper_jpn_186_679_1295_1472_2089_.jpg",
"images/korean/melanonychia/semisuper_jpn_257_266_137_586_458_DSCF6207.jpg",
"images/korean/melanonychia/semisuper_jpn_273_135_88_529_491_img0051.jpg",
"images/korean/melanonychia/semisuper_jpn_313_108_239_417_534_img0125.jpg",
"images/korean/melanonychia/semisuper_jpn_440_810_370_1054_613_0b8c4b3f.JPG",
"images/korean/melanonychia/semisuper_jpn_520_810_370_1054_613_0b8c4b3f.JPG",
"images/korean/melanonychia/semisuper_kor_735_385_30_617_262_.jpg",
"images/korean/melanonychia/semisuper_kor_801_65_190_310_435_th_273B244851FA360222B299.jpg",
"images/korean/melanonychia/semisuper_kor_816_286_11_489_222_1388845213-13.jpg",
"images/korean/melanonychia/semisuper_kor_841_17_37_303_360_20160215195012476.jpg",
"images/korean/melanonychia/semisuper_kor_846_131_357_331_557_U1422432619.jpg",

];

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cache_name).then(function(cache) {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(files_to_cache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open(cache_name).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
        if(cache_name.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});