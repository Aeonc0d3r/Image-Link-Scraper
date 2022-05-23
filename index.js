const axios = require('axios')
const Path = require('path')
const Fs = require('fs')

const getStr = (str, left, right) => {
			try {
				let texto = str.split(left)
				let texto1 = texto[1].split(right)
				return texto1[0]
			} catch (err) {
				return undefined
			}
		}
		
const path = Path.resolve(__dirname, 'images', 'code.jpg')
const writer = Fs.createWriteStream(path)


axios.get('https://www.pixiv.net/en/artworks/98014642', {
  headers: {
    "cache-control": "max-age=0",
        "sec-ch-ua": 'Not A;Brand";v="99", "Chromium";v="100", "Opera GX";v="86"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 OPR/86.0.4363.64 (Edition std-1)",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "referer": "https://accounts.pixiv.net/",
        "accept-encoding": "gzip, deflate, br",
		"cookie": "first_visit_datetime_pc=2022-05-20+01%3A42%3A32; p_ab_id=6; p_ab_id_2=0; p_ab_d_id=752748300; __utmc=235335808; yuid_b=QZhiZkI; tag_view_ranking=RTJMXD26Ak~Lt-oEicbBr~IxKzWy6An6~ptyAET71lu~9LhLC1Kxwa; _ga=GA1.2.1401996621.1652978552; _gid=GA1.2.1532044527.1652981468; PHPSESSID=81860094_D5WRqJv44BLdvgI8D81IXnSLHSwJORlU; device_token=8de2b0afba4ca4f8e5df9a6ca97cc13f; privacy_policy_agreement=3; c_type=22; privacy_policy_notification=0; a_type=0; b_type=2; __utmv=235335808.|3=plan=normal=1^5=gender=female=1^6=user_id=81860094=1^11=lang=en=1; __utma=235335808.1401996621.1652978552.1652985698.1652987980.4; __utmz=235335808.1652987980.4.3.utmcsr=accounts.pixiv.net|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; __utmb=235335808.2.10.1652987980; __cf_bm=gxzuMKyWb_hGRrh57HBHCNa3SljH.qumAAW.REI3x9c-1652987989-0-AS4UlOPqs7okRq/YTvp4GMAH8H9vivvHfnEq/CjOJKEK0NDXBoz++5e7193WOqi65cxgpnbGIKXPE6g8biS77ciO2h0gcZgeYEIVF9C6f7HWScJgPgb4+j3q4Kxz7M0vzsvadKoIOeFUeJxK/rhmEQ27i/n2cVSq0XeaEUJvOOXnHk+BidSFPq/ePBIRA90QPA==; QSI_S_ZN_5hF4My7Ad6VNNAi=r:10:5",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
		
	
  }
})
.then((res) => {
  //console.log(res.data)
  const resposta = res.data;
  //console.log(resposta)
  const foto = getStr(resposta, '"original":"', '"')
  //console.log(foto)
  
 async function downloadImage () {
	console.log(foto)
  const url = foto;
  const path = Path.resolve(__dirname, 'images', 'code.jpg')
  const writer = Fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadImage(foto)  

})
.catch((error) => {
  console.error(error)
})

