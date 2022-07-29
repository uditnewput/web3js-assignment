import express, { Express, Request, Response } from 'express';
import check from './check';
import balance from './balance';
import { failedArray, userData } from '../constants/tinyview';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the Web3JS Assignment Backend!</h1>');
});

router.post('/tinyview-dev/getFilteredUsers', async (req: any, res: any) => {
  const request = require("request-promise");
  let responseObject = {}
  // const comicNames = ["olo", "test", "gemma", "archie", "connie", "thenib", "matt-bors", "biographic", "itchy-feet", "rob-rogers", "lunarbaboon", "product-plug", "fowl-language", "bite-subscribe", "heart-and-brain", "say-their-names", "frankie-fearless", "in-science-we-trust", "ryan-alexander-tanner", "index.json"]
  // for (const name of comicNames) {
  console.log(req.body.data.months);

  const url = `http://localhost:5001/tinyview-dev/us-central1/getFilteredUsers`;
  const requestObj = {
    method: "POST",
    uri: url,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    json: true,
    body: {
      data: {
        "months": req.body.data.months
      }
    },
  };
  console.log(requestObj);
  const result = await request(requestObj)
  console.log(result);


  // responseObject = { ...responseObject, ...result.body.result }
  // }

  return res.send(result.result);
});

router.post('/tinyview-dev/populate', async (req: any, res: any) => {
  const request = require("request-promise");
  const url = `http://localhost:5001/tinyview-dev/us-central1/populateFeedAtNewSubscription`;
  console.log(req.body.data.months);
  let successResponseObject = [];
  let failureResponseObject = [];
  const userFollowingData = userData.data.userFollowingData;
  for (const user of userFollowingData) {
    const successObj: any = {
      userID: user.userID,
      successArray: []
    };
    const failureObj: any = {
      userID: user.userID,
      failureArray: []
    };
    for (const series of user.followArray) {
      const requestObj = {
        method: "POST",
        uri: url,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3ZGRlMTAyMDAyMGI3OGZiODc2ZDdiMjVlZDhmMGE5Y2UwNmRiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGlueXZpZXctZGV2IiwiYXVkIjoidGlueXZpZXctZGV2IiwiYXV0aF90aW1lIjoxNjQ0OTk5MjIxLCJ1c2VyX2lkIjoiUVJmVDNzdHRISllQNDhHR0VOcnRrMncyYTFwMSIsInN1YiI6IlFSZlQzc3R0SEpZUDQ4R0dFTnJ0azJ3MmExcDEiLCJpYXQiOjE2NDQ5OTkyMjEsImV4cCI6MTY0NTAwMjgyMSwiZW1haWwiOiJzdXJlbmRyYUBuZXdwdXQuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInN1cmVuZHJhQG5ld3B1dC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.eG3oiKII2ZsBhTecMzKLnJeE5yeQ_LsJwEvPxOFgNhOeklzOICpnrwmGWy9LqNhPwihV6nd5nMqhlMdbsibSQ1XUi_s_ab1-Ih0c8Fgoa9VIWjfkPybyE5Jed_lga2sBHn6oztaAkgESzMzn9hcBVCkWssbFrhvylQKno_Q7Kp2eCLih_0bPCEeyNbjgm-4E31C_ykv92uOcsOmY2sdiLb0qtjslDo44M8YGqTLjZCrEOoNQIQcLkplB8aaLTpNYDRM_dwIJcO52tnTxpLCNqY3oN28nbZjDnpDS_ZernND7UwWsoQufv8fpqJ31m_e9R6kadXr0IJd8UPEJ3gBoVg"
        },
        json: true,
        body: {
          data: {
            "comicID": series,
            "userID": user.userID
          }
        },
      };
      try {
        const result = await request(requestObj);
        console.log(`done in ${result.result.meta.processingTimeInSec} seconds | User ID: ${user.userID} | ${series}`);
        successObj.successArray.push(series);
      } catch (error) {
        console.log(error);
        failureObj.failureArray.push(series);
      }
    }
    successResponseObject.push(successObj);
    failureResponseObject.push(failureObj);

    // responseObject = { ...responseObject, ...result.body.result }
  }

  return res.send({ successResponseObject, failureResponseObject });
});

router.post('/tinyview-dev/deleteFeed', async (req: any, res: any) => {
  const request = require("request-promise");
  const url = `http://localhost:5001/tinyview-dev/us-central1/deleteFeedAndClearData`;
  console.log(req.body.data.months);
  console.log(req.headers.authorization);

  let successResponseObject = [];
  let failureResponseObject = [];
  const userFollowingData = failedArray || userData.data.userFollowingData;
  for (const user of userFollowingData) {
    let successObj: any = {
      userID: user.userID
    }; let failureObj: any = {
      userID: user.userID
    };
    const requestObj = {
      method: "POST",
      uri: url,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": req.headers.authorization
      },
      json: true,
      body: {
        data: {
          "userID": user.userID
        }
      },
    };
    try {
      const result = await request(requestObj);
      console.log(result?.result?.data);
      console.log(`Cleared in ${result.result.meta.processingTimeInSec} seconds | User ID: ${user.userID}`);
      failureObj = {};
    } catch (error) {
      console.log(error);
      successObj = {};
    }
    successResponseObject.push(successObj);
    failureResponseObject.push(failureObj);

    // responseObject = { ...responseObject, ...result.body.result }
  }

  return res.send({ successResponseObject, failureResponseObject });
});


router.post('/onesky/fail-payment', async (req: any, res: any) => {
  const request = require("request-promise");

  try {
  } catch (error) {
  }
});



router.use('/check', check);
router.use('/balance', balance);

export = router;
