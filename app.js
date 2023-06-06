
import express from "express"
import truecallerjs from "truecallerjs";
const app = express();
const port = 3001;


let json_data;



// async function scrapeTrueCallerData(phoneNumber) {
//   try {
    
//     const data = await truecallerjs.search(phoneNumber);

//     console.log(data);

    
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

app.get("/",async(req,res)=>{
  console.log('hi')
   json_data = await truecallerjs.login("+917045284960"); 
   console.log(json_data)

})
app.get("/:sendOtp",async(req,res)=>{
  console.log("hii otpkdscsdnc")
  const otp = req.params.sendOtp;
  
  const data = await truecallerjs.verifyOtp("+917045284960", json_data, otp);

  console.log(data);
})


app.get('/api/truecaller/:phoneNumber', async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  
  var search_data = {
    number: phoneNumber,
    countryCode: "IN",
    installationId: "a1i0j--fpN0vhFJFWaBC24S-OZxmNY9waDqHnlVT8b44Pk6GAdLzTQgIz6pU1ZR1",
  };
  try {
    
    const data = await truecallerjs.search(search_data);
    console.log(data.json())
    if (data) {
      res.json(data.json());
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
