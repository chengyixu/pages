
API key =
pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43

Access Key ID=
8920afda-ae35-4227-a500-a589f95ae442

Secret Access Key=
pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43

S3 Endpoint =
https://files.polygon.io

Bucket=
flatfiles


instructions:
In most production environments, you will rarely manually construct HTTP requests and parse JSON responses as demonstrated here. Instead, you would typically rely on one of our official client libraries, which handle tasks such as:

Authentication and credential management
Request formatting and error handling
Data parsing and integration into your applications
By following the manual steps below, you will gain an understanding of what is happening under the hood when you make a request. This foundational knowledge can give you greater confidence in what our client libraries do on your behalf and help you troubleshoot issues more effectively.

Authenticate Your Request
Before you can access Polygon.io data, you need your unique API key.

Obtaining Your API Key

Sign up or log in to your account.
Visit your Dashboard to find your API key.
Keep your API key secure and do not share it publicly.
You can include your API key in two ways:

Query String Parameter (e.g., ?apiKey=YOUR_API_KEY):


Query String Authentication


https://api.polygon.io/v3/reference/dividends?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Authorization Header:


Header Authentication


GET /v3/reference/dividends HTTP/1.1
Host: api.polygon.io
Authorization: Bearer pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Note: Replace YOUR_API_KEY with your actual API key from your dashboard.

Making Your First API Request
At your terminal, let’s make a simple request using the curl command, to the Dividends endpoint to list recent dividends.


cURL


curl "https://api.polygon.io/v3/reference/dividends?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43"
This command retrieves dividend records. For more parameters and advanced filtering options, see the Dividends endpoint documentation.

Pro Tip: If you omit your API key or use an invalid one, you will receive an authorization error. Ensure you have replaced YOUR_API_KEY with your actual key before running the command.

Understanding the API Response
All REST API endpoints from Polygon.io return data in a structured JSON format. You will commonly see fields like status, count, results, and request_id at the root level. The results field typically contains an array of objects, each representing an individual data record (such as a dividend, trade, or ticker detail).


JSON Response


{
  "results": [
      {
          "cash_amount": 0.25,
          "currency": "USD",
          "declaration_date": "2024-10-31",
          "dividend_type": "CD",
          "ex_dividend_date": "2024-11-08",
          "frequency": 4,
          "id": "E416a068758f85277196150c3eb73a3331d04698856c141e883ad95710dd0b189",
          "pay_date": "2024-11-14",
          "record_date": "2024-11-11",
          "ticker": "AAPL"
      }
  ],
  "status": "OK",
  "request_id": "5a8e1e551dc3a1c2c203744543b40399",
}
This pattern is consistent across our REST endpoints. Once you understand how to authenticate, make requests, and parse JSON responses for one endpoint -- like Dividends -- you can apply the same approach to all other endpoints. As you explore different datasets (e.g., trades, quotes, fundamentals), you will find that the process remains the same: use your API key, structure your request URL or headers appropriately, and parse the returned JSON to integrate the data into your applications.

Now that you know how to authenticate and issue requests, you have the basic skills to use any of the Polygon.io REST endpoints.



Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Tickers/
All Tickers
All Tickers
GET
/v3/reference/tickers
Retrieve a comprehensive list of ticker symbols supported by Polygon.io across various asset classes (e.g., stocks, indices, forex, crypto). Each ticker entry provides essential details such as symbol, name, market, currency, and active status.

Use Cases: Asset discovery, data integration, filtering/selection, and application development.

Query Parameters
Reset values
ticker
string
Specify a ticker symbol. Defaults to empty string which queries all tickers.

Show filter modifiers
type
enum (string)

Select
Specify the type of the tickers. Find the types that we support via our Ticker Types API. Defaults to empty string which queries all types.
market
enum (string)

stocks
Filter by market type. By default all markets are included.
exchange
string
Specify the primary exchange of the asset in the ISO code format. Find more information about the ISO codes at the ISO org website. Defaults to empty string which queries all exchanges.
cusip
string
Specify the CUSIP code of the asset you want to search for. Find more information about CUSIP codes at their website. Defaults to empty string which queries all CUSIPs.

Note: Although you can query by CUSIP, due to legal reasons we do not return the CUSIP in the response.
cik
string
Specify the CIK of the asset you want to search for. Find more information about CIK codes at their website. Defaults to empty string which queries all CIKs.
date
string
Specify a point in time to retrieve tickers available on that date. Defaults to the most recent available date.
search
string
Search for terms within the ticker and/or company name.
active
boolean

true
Specify if the tickers returned should be actively traded on the queried date. Default is true.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
100
Limit the number of results returned, default is 100 and max is 1000.
sort
enum (string)

ticker
Sort field used for ordering.
Response Attributes
count
integer
optional
The total number of results for this request.
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of tickers that match your query.

Note: Although you can query by CUSIP, due to legal reasons we do not return the CUSIP in the response.

Hide child attributes
active
boolean
optional
Whether or not the asset is actively traded. False means the asset has been delisted.
cik
string
optional
The CIK number for this ticker. Find more information here.
composite_figi
string
optional
The composite OpenFIGI number for this ticker. Find more information here
currency_name
string
optional
The name of the currency that this asset is traded with.
delisted_utc
string
optional
The last date that the asset was traded.
last_updated_utc
string
optional
The information is accurate up to this time.
locale
enum (us, global)
The locale of the asset.
market
enum (stocks, crypto, fx, otc, indices)
The market type of the asset.
name
string
The name of the asset. For stocks/equities this will be the companies registered name. For crypto/fx this will be the name of the currency or coin pair.
primary_exchange
string
optional
The ISO code of the primary listing exchange for this asset.
share_class_figi
string
optional
The share Class OpenFIGI number for this ticker. Find more information here
ticker
string
The exchange symbol that this item is traded under.
type
string
optional
The type of the asset. Find the types that we support via our Ticker Types API.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

tickers = []
for t in client.list_tickers(
	market="stocks",
	active="true",
	order="asc",
	limit="100",
	sort="ticker",
	):
    tickers.append(t)

print(tickers)
Query URL
GET
https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&order=asc&limit=100&sort=ticker&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "next_url": "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "e70013d92930de90e089dc8fa098888e",
  "results": [
    {
      "active": true,
      "cik": "0001090872",
      "composite_figi": "BBG000BWQYZ5",
      "currency_name": "usd",
      "last_updated_utc": "2021-04-25T00:00:00Z",
      "locale": "us",
      "market": "stocks",
      "name": "Agilent Technologies Inc.",
      "primary_exchange": "XNYS",
      "share_class_figi": "BBG001SCTQY4",
      "ticker": "A",
      "type": "CS"
    }
  ],
  "status": "OK"
}
Stocks Overview
Ticker Overview
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
All Tickers | Stocks REST API - Polygon


{
  "results": [
    {
      "ticker": "A",
      "name": "Agilent Technologies Inc.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001090872",
      "composite_figi": "BBG000C2V3D6",
      "share_class_figi": "BBG001SCTQY4",
      "last_updated_utc": "2025-05-21T00:00:00Z"
    },
    {
      "ticker": "AA",
      "name": "Alcoa Corporation",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001675149",
      "composite_figi": "BBG00B3T3HD3",
      "share_class_figi": "BBG00B3T3HF1",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAA",
      "name": "Alternative Access First Priority CLO Bond ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "ARCX",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG01B0JRCS6",
      "share_class_figi": "BBG01B0JRCT5",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAAU",
      "name": "Goldman Sachs Physical Gold ETF Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "BATS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001708646",
      "composite_figi": "BBG00LPXX872",
      "share_class_figi": "BBG00LPXX8Z1",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACB",
      "name": "Artius II Acquisition Inc. Class A Ordinary Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0002034334",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACBR",
      "name": "Artius II Acquisition Inc. Rights",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "RIGHT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002034334",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACBU",
      "name": "Artius II Acquisition Inc. Units",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "UNIT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002034334",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACG",
      "name": "ATA Creativity Global American Depositary Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ADRC",
      "active": true,
      "currency_name": "usd",
      "cik": "0001420529",
      "composite_figi": "BBG000V2S3P6",
      "share_class_figi": "BBG001T125S9",
      "last_updated_utc": "2025-06-23T00:00:00Z"
    },
    {
      "ticker": "AACI",
      "name": "Armada Acquisition Corp. II Class A Ordinary Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0002044009",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACIU",
      "name": "Armada Acquisition Corp. II Units",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "UNIT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002044009",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACIW",
      "name": "Armada Acquisition Corp. II Warrant",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "WARRANT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002044009",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACT",
      "name": "Ares Acquisition Corporation II",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001853138",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACT.U",
      "name": "Ares Acquisition Corporation II Units, each consisting of one Class A ordinary share and one-half of one redeemable warrant",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "UNIT",
      "active": true,
      "currency_name": "usd",
      "cik": "0001853138",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AACT.WS",
      "name": "Ares Acquisition Corporation II Redeemable Warrants, each whole warrant exercisable for one Class A ordinary share at an exercise price of $11.50",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "WARRANT",
      "active": true,
      "currency_name": "usd",
      "cik": "0001853138",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AADR",
      "name": "AdvisorShares Dorsey Wright ADR ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001408970",
      "composite_figi": "BBG000BDYRW6",
      "share_class_figi": "BBG001T9B1Y4",
      "last_updated_utc": "2025-05-19T00:00:00Z"
    },
    {
      "ticker": "AAL",
      "name": "American Airlines Group Inc.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000006201",
      "composite_figi": "BBG005P7Q881",
      "share_class_figi": "BBG005P7Q907",
      "last_updated_utc": "2025-06-03T00:00:00Z"
    },
    {
      "ticker": "AAM",
      "name": "AA Mission Acquisition Corp.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0002012964",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAM.U",
      "name": "AA Mission Acquisition Corp. Units, each consisting of one Class A Ordinary Share and one-half of one redeemable warrant",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "UNIT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002012964",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAM.WS",
      "name": "AA Mission Acquisition Corp. Warrants, each whole warrant entitles the holder to purchase one Class A ordinary share at a price of $11.50 per share",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "WARRANT",
      "active": true,
      "currency_name": "usd",
      "cik": "0002012964",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAME",
      "name": "Atlantic American Corp",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000008177",
      "composite_figi": "BBG000B9XB24",
      "share_class_figi": "BBG001S5N8T1",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAMI",
      "name": "Acadian Asset Management Inc.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001748824",
      "composite_figi": "BBG00P2HLNY3",
      "share_class_figi": "BBG00P2HLNZ2",
      "last_updated_utc": "2025-01-02T00:00:00Z"
    },
    {
      "ticker": "AAOI",
      "name": "Applied Optoelectronics, Inc.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001158114",
      "composite_figi": "BBG000D6VW15",
      "share_class_figi": "BBG001SG47G4",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAON",
      "name": "Aaon Inc",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000824142",
      "composite_figi": "BBG000C2LZP3",
      "share_class_figi": "BBG001S6CZK0",
      "last_updated_utc": "2025-06-12T00:00:00Z"
    },
    {
      "ticker": "AAP",
      "name": "ADVANCE AUTO PARTS INC",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001158449",
      "composite_figi": "BBG000F7RCJ1",
      "share_class_figi": "BBG001SD2SB2",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPB",
      "name": "GraniteShares ETF Trust GraniteShares 2x Long AAPL Daily ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001689873",
      "composite_figi": "BBG0193F21N2",
      "share_class_figi": "BBG0193F22H7",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPD",
      "name": "Direxion Daily AAPL Bear 1X Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG0193YGJ57",
      "share_class_figi": "BBG0193YGK09",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPG",
      "name": "Ascentage Pharma Group International American Depository Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ADRC",
      "active": true,
      "currency_name": "usd",
      "cik": "0002023311",
      "composite_figi": "BBG01RJXM9C9",
      "share_class_figi": "BBG01RJXMB89",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPL",
      "name": "Apple Inc.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000320193",
      "composite_figi": "BBG000B9XRY4",
      "share_class_figi": "BBG001S5N8V8",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPR",
      "name": "Innovator Equity Defined Protection ETF - 2 Yr to April 2026",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "BATS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001415726",
      "composite_figi": "BBG01M698CQ1",
      "share_class_figi": "BBG01M698DK5",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPU",
      "name": "Direxion Shares ETF Trust Direxion Daily AAPL Bull 2X Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG0193YBZ92",
      "share_class_figi": "BBG0193YC043",
      "last_updated_utc": "2025-05-16T00:00:00Z"
    },
    {
      "ticker": "AAPW",
      "name": "Roundhill AAPL WeeklyPay ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "BATS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG01SCFVRC3",
      "share_class_figi": "BBG01SCFVS86",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPX",
      "name": "T-Rex 2X Long Apple Daily Target ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "BATS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG01KY72SD3",
      "share_class_figi": "BBG01KY72T78",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAPY",
      "name": "Kurv Yield Premium Strategy Apple (AAPL) ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "BATS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG01QY0GMH9",
      "share_class_figi": "BBG01QY0GNH7",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AARD",
      "name": "Aardvark Therapeutics, Inc. Common Stock",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001774857",
      "composite_figi": "BBG01223DLB2",
      "share_class_figi": "BBG01223DLC1",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAT",
      "name": "AMERICAN ASSETS TRUST, INC.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001500217",
      "composite_figi": "BBG00161BCR0",
      "share_class_figi": "BBG001TCBJS5",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAUC",
      "name": "Allied Gold Corporation",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001993344",
      "composite_figi": "BBG01K0WWT59",
      "share_class_figi": "BBG01J3PPZ58",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAVM",
      "name": "EA Series Trust Alpha Architect Global Factor Equity ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG00GM1DQV1",
      "share_class_figi": "BBG00GM1DRK1",
      "last_updated_utc": "2025-06-03T00:00:00Z"
    },
    {
      "ticker": "AAXJ",
      "name": "iShares MSCI All Country Asia ex Japan ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG000G6GXC5",
      "share_class_figi": "BBG001T2V2D8",
      "last_updated_utc": "2024-10-09T00:00:00Z"
    },
    {
      "ticker": "AAXJ",
      "name": "iShares MSCI All Country Asia ex Japan ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001100663",
      "composite_figi": "BBG000G6GXC5",
      "share_class_figi": "BBG001T2V2D8",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "AAXN",
      "name": "Axon Enterprise, Inc. Common Stock",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001069183",
      "composite_figi": "BBG000BHJWG1",
      "share_class_figi": "BBG001SB2HG5",
      "last_updated_utc": "2019-01-03T00:00:00Z"
    },
    {
      "ticker": "AB",
      "name": "AllianceBernstein Holding, L.P.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000825313",
      "composite_figi": "BBG000B9WM03",
      "share_class_figi": "BBG001S5N9S0",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABAT",
      "name": "American Battery Technology Company Common Stock",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001576873",
      "composite_figi": "BBG004M1KJN5",
      "share_class_figi": "BBG004M1KJP3",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABBV",
      "name": "ABBVIE INC.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001551152",
      "composite_figi": "BBG0025Y4RY4",
      "share_class_figi": "BBG0025Y4RZ3",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABC",
      "name": "AMERISOURCEBERGEN CORP",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG000MDCQC2",
      "share_class_figi": "BBG001S8X7P0",
      "last_updated_utc": "2016-05-18T00:00:00Z"
    },
    {
      "ticker": "ABCB",
      "name": "Ameris Bancorp",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000351569",
      "composite_figi": "BBG000CDY3H5",
      "share_class_figi": "BBG001S80PX7",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABCL",
      "name": "AbCellera Biologics Inc. Common Shares",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0001703057",
      "composite_figi": "BBG00LLW2MF2",
      "share_class_figi": "BBG00LLW2MH0",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABCS",
      "name": "Alpha Blue Capital US Small-Mid Cap Dynamic ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "composite_figi": "BBG01KMFQRF2",
      "share_class_figi": "BBG01KMFQS88",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABEO",
      "name": "Abeona Therapeutics Inc. Common Stock",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNAS",
      "type": "CS",
      "active": true,
      "currency_name": "usd",
      "cik": "0000318306",
      "composite_figi": "BBG000DT5D52",
      "share_class_figi": "BBG001S8T7K0",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABEQ",
      "name": "Absolute Select Value ETF",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "ARCX",
      "type": "ETF",
      "active": true,
      "currency_name": "usd",
      "cik": "0001199046",
      "composite_figi": "BBG00RHHGQY2",
      "share_class_figi": "BBG00RHHGRP0",
      "last_updated_utc": "2025-06-27T00:00:00Z"
    },
    {
      "ticker": "ABEV",
      "name": "AMBEV S.A.",
      "market": "stocks",
      "locale": "us",
      "primary_exchange": "XNYS",
      "type": "ADRC",
      "active": true,
      "currency_name": "usd",
      "cik": "0001565025",
      "composite_figi": "BBG000BN5VZ4",
      "share_class_figi": "BBG005KLVT74",
      "last_updated_utc": "2025-04-17T00:00:00Z"
    }
  ],
  "status": "OK",
  "request_id": "5b005f1aa88230d8f908350e5fafbba2",
  "count": 100,
  "next_url": "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmYXA9QUNIQyU3QzAyZWMyYTViNDIxYTcyZDIzNTFmZjFjNmVhOGZmMTU3Y2YxYzY2NWU0ODkxZDY3YjhlNDZhMzEyY2Q2MzdiYjQmYXM9JmRhdGU9MjAyNS0wNi0yOSZsaW1pdD0xMDAmbWFya2V0PXN0b2NrcyZvcmRlcj1hc2Mmc29ydD10aWNrZXI"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Tickers/
Ticker Overview
Ticker Overview
GET
/v3/reference/tickers/{ticker}
Retrieve comprehensive details for a single ticker supported by Polygon.io. This endpoint offers a deep look into a company’s fundamental attributes, including its primary exchange, standardized identifiers (CIK, composite FIGI, share class FIGI), market capitalization, industry classification, and key dates. Users also gain access to branding assets (e.g., logos, icons), enabling them to enrich applications and analyses with visually consistent, contextually relevant information.

Use Cases: Company research, data integration, application enhancement, due diligence & compliance.

Path Parameters
Reset values
ticker
string
required
AAPL
The ticker symbol of the asset.
Query Parameters
date
string
Specify a point in time to get information about the ticker available on that date. When retrieving information from SEC filings, we compare this date with the period of report date on the SEC filing.

For example, consider an SEC filing submitted by AAPL on 2019-07-31, with a period of report date ending on 2019-06-29. That means that the filing was submitted on 2019-07-31, but the filing was created based on information from 2019-06-29. If you were to query for AAPL details on 2019-06-29, the ticker details would include information from the SEC filing.

Defaults to the most recent available date.
Response Attributes
count
integer
optional
The total number of results for this request.
request_id
string
optional
A request id assigned by the server.
results
object
optional
Ticker with details.

Hide child attributes
active
boolean
Whether or not the asset is actively traded. False means the asset has been delisted.
address
object
optional
Company headquarters address details.

Show child attributes
branding
object
optional
Provides URLs aiding in visual identification.

Show child attributes
cik
string
optional
The CIK number for this ticker. Find more information here.
composite_figi
string
optional
The composite OpenFIGI number for this ticker. Find more information here
currency_name
string
The name of the currency that this asset is traded with.
delisted_utc
string
optional
The last date that the asset was traded.
description
string
optional
A description of the company and what they do/offer.
homepage_url
string
optional
The URL of the company's website homepage.
list_date
string
optional
The date that the symbol was first publicly listed in the format YYYY-MM-DD.
locale
enum (us, global)
The locale of the asset.
market
enum (stocks, crypto, fx, otc, indices)
The market type of the asset.
market_cap
number
optional
The most recent close price of the ticker multiplied by weighted outstanding shares.
name
string
The name of the asset. For stocks/equities this will be the companies registered name. For crypto/fx this will be the name of the currency or coin pair.
phone_number
string
optional
The phone number for the company behind this ticker.
primary_exchange
string
optional
The ISO code of the primary listing exchange for this asset.
round_lot
number
optional
Round lot size of this security.
share_class_figi
string
optional
The share Class OpenFIGI number for this ticker. Find more information here
share_class_shares_outstanding
number
optional
The recorded number of outstanding shares for this particular share class.
sic_code
string
optional
The standard industrial classification code for this ticker. For a list of SIC Codes, see the SEC's SIC Code List.
sic_description
string
optional
A description of this ticker's SIC code.
ticker
string
The exchange symbol that this item is traded under.
ticker_root
string
optional
The root of a specified ticker. For example, the root of BRK.A is BRK.
ticker_suffix
string
optional
The suffix of a specified ticker. For example, the suffix of BRK.A is A.
total_employees
number
optional
The approximate number of employees for the company.
type
string
optional
The type of the asset. Find the types that we support via our Ticker Types API.
weighted_shares_outstanding
number
optional
The shares outstanding calculated assuming all shares of other share classes are converted to this share class.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

details = client.get_ticker_details(
	"AAPL",
	)

print(details)
Query URL
GET
https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": {
    "active": true,
    "address": {
      "address1": "One Apple Park Way",
      "city": "Cupertino",
      "postal_code": "95014",
      "state": "CA"
    },
    "branding": {
      "icon_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
      "logo_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg"
    },
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "currency_name": "usd",
    "description": "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
    "homepage_url": "https://www.apple.com",
    "list_date": "1980-12-12",
    "locale": "us",
    "market": "stocks",
    "market_cap": 2771126040150,
    "name": "Apple Inc.",
    "phone_number": "(408) 996-1010",
    "primary_exchange": "XNAS",
    "round_lot": 100,
    "share_class_figi": "BBG001S5N8V8",
    "share_class_shares_outstanding": 16406400000,
    "sic_code": "3571",
    "sic_description": "ELECTRONIC COMPUTERS",
    "ticker": "AAPL",
    "ticker_root": "AAPL",
    "total_employees": 154000,
    "type": "CS",
    "weighted_shares_outstanding": 16334371000
  },
  "status": "OK"
}
All Tickers
Ticker Types
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Overview | Stocks REST API - Polygon

{
  "request_id": "fc3b26ee6f2eccda59d00a5434f76b37",
  "results": {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNAS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "share_class_figi": "BBG001S5N8V8",
    "market_cap": 3009568939000,
    "phone_number": "(408) 996-1010",
    "address": {
      "address1": "ONE APPLE PARK WAY",
      "city": "CUPERTINO",
      "state": "CA",
      "postal_code": "95014"
    },
    "description": "Apple is among the largest companies in the world, with a broad portfolio of hardware and software products targeted at consumers and businesses. Apple's iPhone makes up a majority of the firm sales, and Apple's other products like Mac, iPad, and Watch are designed around the iPhone as the focal point of an expansive software ecosystem. Apple has progressively worked to add new applications, like streaming video, subscription bundles, and augmented reality. The firm designs its own software and semiconductors while working with subcontractors like Foxconn and TSMC to build its products and chips. Slightly less than half of Apple's sales come directly through its flagship stores, with a majority of sales coming indirectly through partnerships and distribution.",
    "sic_code": "3571",
    "sic_description": "ELECTRONIC COMPUTERS",
    "ticker_root": "AAPL",
    "homepage_url": "https://www.apple.com",
    "total_employees": 164000,
    "list_date": "1980-12-12",
    "branding": {
      "logo_url": "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2025-04-04_logo.svg",
      "icon_url": "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2025-04-04_icon.png"
    },
    "weighted_shares_outstanding": 14935826000,
    "round_lot": 100
  },
  "status": "OK"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Tickers/
Ticker Types
Ticker Types
GET
/v3/reference/tickers/types
Retrieve a list of all ticker types supported by Polygon.io. This endpoint categorizes tickers across asset classes, markets, and instruments, helping users understand the different classifications and their attributes.

Use Cases: Data classification, filtering mechanisms, educational reference, system integration.

Query Parameters
Reset values
asset_class
enum (string)

stocks
Filter by asset class.
locale
enum (string)

us
Filter by locale.
Response Attributes
count
integer
optional
The total number of results for this request.
request_id
string
A request ID assigned by the server.
results
array (object)
optional

Hide child attributes
asset_class
enum (stocks, options, crypto, fx, indices)
An identifier for a group of similar financial instruments.
code
string
A code used by Polygon.io to refer to this ticker type.
description
string
A short description of this ticker type.
locale
enum (us, global)
An identifier for a geographical location.
status
string
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

types = client.get_ticker_types(
	asset_class="stocks",
	locale="us"
	)

print(types)
Query URL
GET
https://api.polygon.io/v3/reference/tickers/types?asset_class=stocks&locale=us&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Ticker Overview
Related Tickers
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Ticker Types | Stocks REST API - Polygon

{
  "count": 1,
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": {
    "asset_class": "stocks",
    "code": "CS",
    "description": "Common Stock",
    "locale": "us"
  },
  "status": "OK"
}

{
  "results": [
    {
      "code": "CS",
      "description": "Common Stock",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "PFD",
      "description": "Preferred Stock",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "WARRANT",
      "description": "Warrant",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "RIGHT",
      "description": "Rights",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "BOND",
      "description": "Corporate Bond",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ETF",
      "description": "Exchange Traded Fund",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ETN",
      "description": "Exchange Traded Note",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ETV",
      "description": "Exchange Traded Vehicle",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "SP",
      "description": "Structured Product",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ADRC",
      "description": "American Depository Receipt Common",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ADRP",
      "description": "American Depository Receipt Preferred",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ADRW",
      "description": "American Depository Receipt Warrants",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ADRR",
      "description": "American Depository Receipt Rights",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "FUND",
      "description": "Fund",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "BASKET",
      "description": "Basket",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "UNIT",
      "description": "Unit",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "LT",
      "description": "Liquidating Trust",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "OS",
      "description": "Ordinary Shares",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "GDR",
      "description": "Global Depository Receipts",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "OTHER",
      "description": "Other Security Type",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "NYRS",
      "description": "New York Registry Shares",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "AGEN",
      "description": "Agency Bond",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "EQLK",
      "description": "Equity Linked Bond",
      "asset_class": "stocks",
      "locale": "us"
    },
    {
      "code": "ETS",
      "description": "Single-security ETF",
      "asset_class": "stocks",
      "locale": "us"
    }
  ],
  "count": 24,
  "status": "OK",
  "request_id": "c091dbd0227c12ba7aef99a9892a4b1f"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Tickers/
Related Tickers
Related Tickers
GET
/v1/related-companies/{ticker}
Retrieve a list of tickers related to a specified ticker, identified through an analysis of news coverage and returns data. This endpoint helps users discover peers, competitors, or thematically similar companies, aiding in comparative analysis, portfolio diversification, and market research.

Use Cases: Peer identification, comparative analysis, portfolio diversification, market research.

Path Parameters
Reset values
ticker
string
required
AAPL
The ticker symbol to search.
Response Attributes
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
ticker
string
A ticker related to the requested ticker.
status
string
optional
The status of this request's response.
ticker
string
optional
The ticker being queried.
Code Examples

Shell

Python

Go


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

related_companies = client.get_related_companies(
	"AAPL"
	)

print(related_companies)
Query URL
GET
https://api.polygon.io/v1/related-companies/AAPL?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Ticker Types
Custom Bars
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Related Tickers | Stocks REST API - Polygon

{
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": [
    {
      "ticker": "MSFT"
    },
    {
      "ticker": "GOOGL"
    },
    {
      "ticker": "AMZN"
    },
    {
      "ticker": "FB"
    },
    {
      "ticker": "TSLA"
    },
    {
      "ticker": "NVDA"
    },
    {
      "ticker": "INTC"
    },
    {
      "ticker": "ADBE"
    },
    {
      "ticker": "NFLX"
    },
    {
      "ticker": "PYPL"
    }
  ],
  "status": "OK",
  "stock_symbol": "AAPL"
}

{
  "request_id": "71c5e6cbf9bc106a845fc3e01c03a509",
  "results": [
    {
      "ticker": "MSFT"
    },
    {
      "ticker": "GOOGL"
    },
    {
      "ticker": "AMZN"
    },
    {
      "ticker": "GOOG"
    },
    {
      "ticker": "NVDA"
    },
    {
      "ticker": "TSLA"
    },
    {
      "ticker": "META"
    },
    {
      "ticker": "NFLX"
    },
    {
      "ticker": "DIS"
    },
    {
      "ticker": "BRK.B"
    }
  ],
  "status": "OK",
  "ticker": "AAPL"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Aggregate Bars (OHLC)/
Custom Bars (OHLC)
Custom Bars (OHLC)
GET
/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve aggregated historical OHLC (Open, High, Low, Close) and volume data for a specified stock ticker over a custom date range and time interval in Eastern Time (ET). Aggregates are constructed exclusively from qualifying trades that meet specific conditions. If no eligible trades occur within a given timeframe, no aggregate bar is produced, resulting in an empty interval that indicates a lack of trading activity during that period. Users can tailor their data by adjusting the multiplier and timespan parameters (e.g., a 5-minute bar), covering pre-market, regular market, and after-hours sessions. This flexibility supports a broad range of analytical and visualization needs.

Use Cases: Data visualization, technical analysis, backtesting strategies, market research.

Path Parameters
Reset values
stocksTicker
string
required
AAPL
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
multiplier
integer
required
1
The size of the timespan multiplier.
timespan
enum (string)
required

day
The size of the time window.
from
string
required
2023-01-09
The start of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
to
string
required
2023-02-10
The end of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
Query Parameters
adjusted
boolean

true
Whether or not the results are adjusted for splits. By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.
sort
enum (string)

asc
Sort the results by timestamp. `asc` will return results in ascending order (oldest at the top), `desc` will return results in descending order (newest at the top).
limit
integer
120
Limits the number of base aggregates queried to create the aggregate results. Max 50000 and Default 5000. Read more about how limit is used to calculate aggregate results in our article on Aggregate Data API Improvements.
Response Attributes
ticker
string
The exchange symbol that this item is traded under.
adjusted
boolean
Whether or not this response was adjusted for splits.
queryCount
integer
The number of aggregates (minute or day) used to generate the response.
request_id
string
A request id assigned by the server.
resultsCount
integer
The total number of results for this request.
status
string
The status of this request's response.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
c
number
The close price for the symbol in the given time period.
h
number
The highest price for the symbol in the given time period.
l
number
The lowest price for the symbol in the given time period.
n
integer
optional
The number of transactions in the aggregate window.
o
number
The open price for the symbol in the given time period.
otc
boolean
optional
Whether or not this aggregate is for an OTC ticker. This field will be left off if false.
t
integer
The Unix millisecond timestamp for the start of the aggregate window.
v
number
The trading volume of the symbol in the given time period.
vw
number
optional
The volume weighted average price.
next_url
string
optional
If present, this value can be used to fetch the next page of data.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

aggs = []
for a in client.list_aggs(
    "AAPL",
    1,
    "day",
    "2023-01-09",
    "2023-02-10",
    adjusted="true",
    sort="asc",
    limit=120,
):
    aggs.append(a)

print(aggs)
Query URL
GET
https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&limit=120&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "adjusted": true,
  "next_url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1578114000000/2020-01-10?cursor=bGltaXQ9MiZzb3J0PWFzYw",
  "queryCount": 2,
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "c": 75.0875,
      "h": 75.15,
      "l": 73.7975,
      "n": 1,
      "o": 74.06,
      "t": 1577941200000,
      "v": 135647456,
      "vw": 74.6099
    },
    {
      "c": 74.3575,
      "h": 75.145,
      "l": 74.125,
      "n": 1,
      "o": 74.2875,
      "t": 1578027600000,
      "v": 146535512,
      "vw": 74.7026
    }
  ],
  "resultsCount": 2,
  "status": "OK",
  "ticker": "AAPL"
}
Related Tickers
Daily Market Summary
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Custom Bars (OHLC) | Stocks REST API - Polygon

{
  "ticker": "AAPL",
  "queryCount": 24,
  "resultsCount": 24,
  "adjusted": true,
  "results": [
    {
      "v": 70790813,
      "vw": 131.6292,
      "o": 130.465,
      "c": 130.15,
      "h": 133.41,
      "l": 129.89,
      "t": 1673240400000,
      "n": 645365
    },
    {
      "v": 63896155,
      "vw": 129.822,
      "o": 130.26,
      "c": 130.73,
      "h": 131.2636,
      "l": 128.12,
      "t": 1673326800000,
      "n": 554940
    },
    {
      "v": 69458949,
      "vw": 132.3081,
      "o": 131.25,
      "c": 133.49,
      "h": 133.51,
      "l": 130.46,
      "t": 1673413200000,
      "n": 561278
    },
    {
      "v": 71379648,
      "vw": 133.171,
      "o": 133.88,
      "c": 133.41,
      "h": 134.26,
      "l": 131.44,
      "t": 1673499600000,
      "n": 635331
    },
    {
      "v": 57809719,
      "vw": 133.6773,
      "o": 132.03,
      "c": 134.76,
      "h": 134.92,
      "l": 131.66,
      "t": 1673586000000,
      "n": 537385
    },
    {
      "v": 63612627,
      "vw": 135.7587,
      "o": 134.83,
      "c": 135.94,
      "h": 137.29,
      "l": 134.13,
      "t": 1673931600000,
      "n": 595831
    },
    {
      "v": 69672800,
      "vw": 136.3316,
      "o": 136.815,
      "c": 135.21,
      "h": 138.61,
      "l": 135.03,
      "t": 1674018000000,
      "n": 578304
    },
    {
      "v": 58280413,
      "vw": 134.9653,
      "o": 134.08,
      "c": 135.27,
      "h": 136.25,
      "l": 133.77,
      "t": 1674104400000,
      "n": 491674
    },
    {
      "v": 80200655,
      "vw": 136.3762,
      "o": 135.28,
      "c": 137.87,
      "h": 138.02,
      "l": 134.22,
      "t": 1674190800000,
      "n": 552230
    },
    {
      "v": 81760313,
      "vw": 141.2116,
      "o": 138.12,
      "c": 141.11,
      "h": 143.315,
      "l": 137.9,
      "t": 1674450000000,
      "n": 719288
    },
    {
      "v": 66435142,
      "vw": 142.0507,
      "o": 140.305,
      "c": 142.53,
      "h": 143.16,
      "l": 140.3,
      "t": 1674536400000,
      "n": 498679
    },
    {
      "v": 65799349,
      "vw": 140.7526,
      "o": 140.89,
      "c": 141.86,
      "h": 142.43,
      "l": 138.81,
      "t": 1674622800000,
      "n": 536505
    },
    {
      "v": 54105068,
      "vw": 143.3429,
      "o": 143.17,
      "c": 143.96,
      "h": 144.25,
      "l": 141.9,
      "t": 1674709200000,
      "n": 472135
    },
    {
      "v": 70547743,
      "vw": 145.8365,
      "o": 143.155,
      "c": 145.93,
      "h": 147.23,
      "l": 143.08,
      "t": 1674795600000,
      "n": 560022
    },
    {
      "v": 64015274,
      "vw": 143.6524,
      "o": 144.955,
      "c": 143,
      "h": 145.55,
      "l": 142.85,
      "t": 1675054800000,
      "n": 551111
    },
    {
      "v": 65874459,
      "vw": 143.6473,
      "o": 142.7,
      "c": 144.29,
      "h": 144.34,
      "l": 142.28,
      "t": 1675141200000,
      "n": 468170
    },
    {
      "v": 77663426,
      "vw": 143.8723,
      "o": 143.97,
      "c": 145.43,
      "h": 146.61,
      "l": 141.32,
      "t": 1675227600000,
      "n": 693374
    },
    {
      "v": 118338980,
      "vw": 149.3764,
      "o": 148.9,
      "c": 150.82,
      "h": 151.18,
      "l": 148.17,
      "t": 1675314000000,
      "n": 996203
    },
    {
      "v": 154338835,
      "vw": 154.2437,
      "o": 148.03,
      "c": 154.5,
      "h": 157.38,
      "l": 147.83,
      "t": 1675400400000,
      "n": 1141350
    },
    {
      "v": 69771906,
      "vw": 152.0939,
      "o": 152.575,
      "c": 151.73,
      "h": 153.1,
      "l": 150.78,
      "t": 1675659600000,
      "n": 583517
    },
    {
      "v": 83322551,
      "vw": 153.4202,
      "o": 150.64,
      "c": 154.65,
      "h": 155.23,
      "l": 150.64,
      "t": 1675746000000,
      "n": 661767
    },
    {
      "v": 63620079,
      "vw": 152.3636,
      "o": 153.88,
      "c": 151.92,
      "h": 154.58,
      "l": 151.168,
      "t": 1675832400000,
      "n": 524140
    },
    {
      "v": 55994243,
      "vw": 152.2769,
      "o": 153.775,
      "c": 150.87,
      "h": 154.33,
      "l": 150.42,
      "t": 1675918800000,
      "n": 471973
    },
    {
      "v": 57388108,
      "vw": 150.4054,
      "o": 149.46,
      "c": 151.01,
      "h": 151.3401,
      "l": 149.22,
      "t": 1676005200000,
      "n": 443405
    }
  ],
  "status": "OK",
  "request_id": "4e99fad7fd9dc224f363b5f588042379",
  "count": 24
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Aggregate Bars (OHLC)/
Daily Market Summary (OHLC)
Daily Market Summary (OHLC)
GET
/v2/aggs/grouped/locale/us/market/stocks/{date}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve daily OHLC (open, high, low, close), volume, and volume-weighted average price (VWAP) data for all U.S. stocks on a specified trading date. This endpoint returns comprehensive market coverage in a single request, enabling wide-scale analysis, bulk data processing, and research into broad market performance.

Use Cases: Market overview, bulk data processing, historical research, and portfolio comparison.

Path Parameters
Reset values
date
string
required
2023-01-09
The beginning date for the aggregate window.
Query Parameters
adjusted
boolean

true
Whether or not the results are adjusted for splits. By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.
include_otc
boolean

Select
Include OTC securities in the response. Default is false (don't include OTC securities).
Response Attributes
adjusted
boolean
Whether or not this response was adjusted for splits.
queryCount
integer
The number of aggregates (minute or day) used to generate the response.
request_id
string
A request id assigned by the server.
resultsCount
integer
The total number of results for this request.
status
string
The status of this request's response.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
T
string
The exchange symbol that this item is traded under.
c
number
The close price for the symbol in the given time period.
h
number
The highest price for the symbol in the given time period.
l
number
The lowest price for the symbol in the given time period.
n
integer
optional
The number of transactions in the aggregate window.
o
number
The open price for the symbol in the given time period.
otc
boolean
optional
Whether or not this aggregate is for an OTC ticker. This field will be left off if false.
t
integer
The Unix millisecond timestamp for the end of the aggregate window.
v
number
The trading volume of the symbol in the given time period.
vw
number
optional
The volume weighted average price.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

grouped = client.get_grouped_daily_aggs(
    "2023-01-09",
    adjusted="true",
)

print(grouped)
Query URL
GET
https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "adjusted": true,
  "queryCount": 3,
  "request_id": {
    "description": "A request id assigned by the server.",
    "type": "string"
  },
  "results": [
    {
      "T": "KIMpL",
      "c": 25.9102,
      "h": 26.25,
      "l": 25.91,
      "n": 74,
      "o": 26.07,
      "t": 1602705600000,
      "v": 4369,
      "vw": 26.0407
    },
    {
      "T": "TANH",
      "c": 23.4,
      "h": 24.763,
      "l": 22.65,
      "n": 1096,
      "o": 24.5,
      "t": 1602705600000,
      "v": 25933.6,
      "vw": 23.493
    },
    {
      "T": "VSAT",
      "c": 34.24,
      "h": 35.47,
      "l": 34.21,
      "n": 4966,
      "o": 34.9,
      "t": 1602705600000,
      "v": 312583,
      "vw": 34.4736
    }
  ],
  "resultsCount": 3,
  "status": "OK"
}
Custom Bars
Daily Ticker Summary
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Daily Market Summary (OHLC) | Stocks REST API - Polygon

{
  "queryCount": 10953,
  "resultsCount": 10953,
  "adjusted": true,
  "results": [
    {
      "T": "TTMI",
      "v": 394280,
      "vw": 16.1078,
      "o": 15.96,
      "c": 16.08,
      "h": 16.335,
      "l": 15.96,
      "t": 1673298000000,
      "n": 5416
    },
    {
      "T": "OEC",
      "v": 485157,
      "vw": 19.0627,
      "o": 18.67,
      "c": 18.98,
      "h": 19.43,
      "l": 18.45,
      "t": 1673298000000,
      "n": 8130
    },
    {
      "T": "USDU",
      "v": 642813,
      "vw": 25.8745,
      "o": 25.92,
      "c": 25.88,
      "h": 25.95,
      "l": 25.8204,
      "t": 1673298000000,
      "n": 2417
    },
    {
      "T": "BWXT",
      "v": 389669,
      "vw": 57.4657,
      "o": 58.15,
      "c": 57.28,
      "h": 58.18,
      "l": 57.025,
      "t": 1673298000000,
      "n": 7325
    },
    {
      "T": "WRB",
      "v": 1947042,
      "vw": 48.8506,
      "o": 49.5267,
      "c": 48.6533,
      "h": 49.5867,
      "l": 48.3933,
      "t": 1673298000000,
      "n": 15947
    },
    {
      "T": "WIW",
      "v": 161653,
      "vw": 9.4369,
      "o": 9.38,
      "c": 9.48,
      "h": 9.5,
      "l": 9.35,
      "t": 1673298000000,
      "n": 983
    },
    {
      "T": "MMIT",
      "v": 135725,
      "vw": 24.4352,
      "o": 24.44,
      "c": 24.45,
      "h": 24.46,
      "l": 24.39,
      "t": 1673298000000,
      "n": 603
    },
    {
      "T": "MTG",
      "v": 3840966,
      "vw": 12.7633,
      "o": 12.78,
      "c": 12.71,
      "h": 12.975,
      "l": 12.67,
      "t": 1673298000000,
      "n": 19098
    },
    {
      "T": "ELVT",
      "v": 123090,
      "vw": 1.794,
      "o": 1.78,
      "c": 1.81,
      "h": 1.81,
      "l": 1.78,
      "t": 1673298000000,
      "n": 233
    },
    {
      "T": "ASG",
      "v": 191632,
      "vw": 5.0731,
      "o": 5.08,
      "c": 5.06,
      "h": 5.13,
      "l": 5.03,
      "t": 1673298000000,
      "n": 954
    },
    {
      "T": "IDOG",
      "v": 45387,
      "vw": 26.7195,
      "o": 26.68,
      "c": 26.5555,
      "h": 26.78,
      "l": 26.555,
      "t": 1673298000000,
      "n": 99
    },
    {
      "T": "ESNT",
      "v": 329384,
      "vw": 38.5945,
      "o": 38.67,
      "c": 38.29,
      "h": 39.155,
      "l": 38.25,
      "t": 1673298000000,
      "n": 5820
    },
    {
      "T": "DCF",
      "v": 18330,
      "vw": 7.3376,
      "o": 7.3,
      "c": 7.37,
      "h": 7.39,
      "l": 7.2501,
      "t": 1673298000000,
      "n": 153
    },
    {
      "T": "KORU",
      "v": 62008.1,
      "vw": 95.026,
      "o": 94.9,
      "c": 93.9,
      "h": 97,
      "l": 93.5,
      "t": 1673298000000,
      "n": 3604
    },
    {
      "T": "ERX",
      "v": 1348852,
      "vw": 67.1425,
      "o": 68.57,
      "c": 66,
      "h": 68.66,
      "l": 65.5656,
      "t": 1673298000000,
      "n": 12074
    },
    {
      "T": "JEF",
      "v": 1599585,
      "vw": 37.7942,
      "o": 37.23,
      "c": 37.75,
      "h": 38.23,
      "l": 37.23,
      "t": 1673298000000,
      "n": 20100
    },
    {
      "T": "GLP",
      "v": 113064,
      "vw": 32.1502,
      "o": 32.06,
      "c": 31.7,
      "h": 32.55,
      "l": 31.7,
      "t": 1673298000000,
      "n": 1664
    },
    {
      "T": "KNSW",
      "v": 530,
      "vw": 10.18,
      "o": 10.18,
      "c": 10.18,
      "h": 10.18,
      "l": 10.18,
      "t": 1673298000000,
      "n": 3
    },
    {
      "T": "FLGR",
      "v": 40625,
      "vw": 20.83,
      "o": 20.79,
      "c": 20.72,
      "h": 20.85,
      "l": 20.705,
      "t": 1673298000000,
      "n": 39
    },
    {
      "T": "BLDG",
      "v": 6662,
      "vw": 26.5141,
      "o": 26.53,
      "c": 26.3801,
      "h": 26.53,
      "l": 26.3801,
      "t": 1673298000000,
      "n": 70
    },
    {
      "T": "OLP",
      "v": 56929,
      "vw": 23.1099,
      "o": 23.04,
      "c": 23.07,
      "h": 23.26,
      "l": 22.8,
      "t": 1673298000000,
      "n": 955
    },
    {
      "T": "MTVC.U",
      "v": 898,
      "vw": 10.2656,
      "o": 10.27,
      "c": 10.26,
      "h": 10.27,
      "l": 10.26,
      "t": 1673298000000,
      "n": 6
    },
    {
      "T": "IBDP",
      "v": 564919,
      "vw": 24.5552,
      "o": 24.55,
      "c": 24.52,
      "h": 24.57,
      "l": 24.5,
      "t": 1673298000000,
      "n": 1496
    },
    {
      "T": "FTI",
      "v": 5208984,
      "vw": 12.5502,
      "o": 12.61,
      "c": 12.38,
      "h": 12.95,
      "l": 12.305,
      "t": 1673298000000,
      "n": 34282
    },
    {
      "T": "VLU",
      "v": 9368,
      "vw": 143.6026,
      "o": 143.86,
      "c": 142.9608,
      "h": 144.6699,
      "l": 142.92,
      "t": 1673298000000,
      "n": 152
    },
    {
      "T": "CDAK",
      "v": 103999,
      "vw": 0.5215,
      "o": 0.5177,
      "c": 0.53,
      "h": 0.541,
      "l": 0.4931,
      "t": 1673298000000,
      "n": 264
    },
    {
      "T": "EPR",
      "v": 552025,
      "vw": 37.3479,
      "o": 37.15,
      "c": 37.14,
      "h": 37.92,
      "l": 37.05,
      "t": 1673298000000,
      "n": 8274
    },
    {
      "T": "DY",
      "v": 322009,
      "vw": 96.2211,
      "o": 96.31,
      "c": 95.09,
      "h": 98.3,
      "l": 94.95,
      "t": 1673298000000,
      "n": 7619
    },
    {
      "T": "RS",
      "v": 309942,
      "vw": 207.1976,
      "o": 209.45,
      "c": 205.69,
      "h": 210.355,
      "l": 204.54,
      "t": 1673298000000,
      "n": 10472
    },
    {
      "T": "ELV",
      "v": 1254681,
      "vw": 474.1561,
      "o": 476.96,
      "c": 470.71,
      "h": 482.79,
      "l": 469.69,
      "t": 1673298000000,
      "n": 28159
    },
    {
      "T": "INSM",
      "v": 1782800,
      "vw": 18.2203,
      "o": 18.29,
      "c": 17.79,
      "h": 19.11,
      "l": 17.7301,
      "t": 1673298000000,
      "n": 20715
    },
    {
      "T": "SPYG",
      "v": 3022892,
      "vw": 51.2602,
      "o": 51.09,
      "c": 50.7,
      "h": 51.55,
      "l": 50.655,
      "t": 1673298000000,
      "n": 13672
    },
    {
      "T": "VERX",
      "v": 177136,
      "vw": 13.0957,
      "o": 12.62,
      "c": 12.99,
      "h": 13.365,
      "l": 12.62,
      "t": 1673298000000,
      "n": 3877
    },
    {
      "T": "CXH",
      "v": 11459,
      "vw": 7.329,
      "o": 7.28,
      "c": 7.32,
      "h": 7.36,
      "l": 7.28,
      "t": 1673298000000,
      "n": 54
    },
    {
      "T": "FFC",
      "v": 217019,
      "vw": 16.1148,
      "o": 16.39,
      "c": 16.04,
      "h": 16.4,
      "l": 15.91,
      "t": 1673298000000,
      "n": 1034
    },
    {
      "T": "MTN",
      "v": 426685,
      "vw": 252.3769,
      "o": 248.68,
      "c": 252.24,
      "h": 253.66,
      "l": 246.68,
      "t": 1673298000000,
      "n": 10467
    },
    {
      "T": "CGA",
      "v": 7492,
      "vw": 4.1831,
      "o": 4.22,
      "c": 4.21,
      "h": 4.27,
      "l": 4.08,
      "t": 1673298000000,
      "n": 86
    },
    {
      "T": "SNDR",
      "v": 734172,
      "vw": 24.6885,
      "o": 24.29,
      "c": 24.63,
      "h": 24.96,
      "l": 24.28,
      "t": 1673298000000,
      "n": 7310
    },
    {
      "T": "BORR",
      "v": 1354458,
      "vw": 5.2888,
      "o": 5.29,
      "c": 5.28,
      "h": 5.445,
      "l": 5.17,
      "t": 1673298000000,
      "n": 7601
    },
    {
      "T": "DAX",
      "v": 21949,
      "vw": 27.4343,
      "o": 27.34,
      "c": 27.36,
      "h": 27.56,
      "l": 27.28,
      "t": 1673298000000,
      "n": 139
    },
    {
      "T": "RGT",
      "v": 1458,
      "vw": 9.134,
      "o": 9.1,
      "c": 9.09,
      "h": 9.18,
      "l": 9.08,
      "t": 1673298000000,
      "n": 26
    },
    {
      "T": "XCCC",
      "v": 2406,
      "vw": 37.4832,
      "o": 37.45,
      "c": 37.54,
      "h": 37.54,
      "l": 37.45,
      "t": 1673298000000,
      "n": 6
    },
    {
      "T": "NCLH",
      "v": 16698648,
      "vw": 13.6488,
      "o": 13.23,
      "c": 13.78,
      "h": 13.88,
      "l": 13.12,
      "t": 1673298000000,
      "n": 79425
    },
    {
      "T": "AAU",
      "v": 291707,
      "vw": 0.2604,
      "o": 0.2602,
      "c": 0.2556,
      "h": 0.2694,
      "l": 0.2516,
      "t": 1673298000000,
      "n": 619
    },
    {
      "T": "EWO",
      "v": 28510,
      "vw": 20.0765,
      "o": 20.12,
      "c": 19.98,
      "h": 20.15,
      "l": 19.98,
      "t": 1673298000000,
      "n": 176
    },
    {
      "T": "TRI",
      "v": 329202.7789,
      "vw": 121.1182,
      "o": 121.1776,
      "c": 120.5241,
      "h": 121.9972,
      "l": 120.3892,
      "t": 1673298000000,
      "n": 6368
    },
    {
      "T": "VOT",
      "v": 155670,
      "vw": 183.4183,
      "o": 182.37,
      "c": 182.3,
      "h": 184.4799,
      "l": 181.77,
      "t": 1673298000000,
      "n": 2722
    },
    {
      "T": "PBA",
      "v": 408583,
      "vw": 34.6409,
      "o": 34.51,
      "c": 34.57,
      "h": 34.84,
      "l": 34.45,
      "t": 1673298000000,
      "n": 9517
    },
    {
      "T": "SGHC",
      "v": 513902,
      "vw": 3.0311,
      "o": 3.09,
      "c": 2.95,
      "h": 3.24,
      "l": 2.89,
      "t": 1673298000000,
      "n": 2819
    },
    {
      "T": "NSL",
      "v": 165602,
      "vw": 4.7258,
      "o": 4.72,
      "c": 4.72,
      "h": 4.75,
      "l": 4.7,
      "t": 1673298000000,
      "n": 933
    }
  ],
  "status": "OK",
  "request_id": "9bbc338551743f3536c673626da2d444",
  "count": 10953
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Aggregate Bars (OHLC)/
Daily Ticker Summary (OHLC)
Daily Ticker Summary (OHLC)
GET
/v1/open-close/{stocksTicker}/{date}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the opening and closing prices for a specific stock ticker on a given date, along with any pre-market and after-hours trade prices. This endpoint provides essential daily pricing details, enabling users to evaluate performance, conduct historical analysis, and gain insights into trading activity outside regular market sessions.

Use Cases: Daily performance analysis, historical data collection, after-hours insights, portfolio tracking.

Path Parameters
Reset values
stocksTicker
string
required
AAPL
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
date
string
required
2023-01-09
The date of the requested open/close in the format YYYY-MM-DD.
Query Parameters
adjusted
boolean

true
Whether or not the results are adjusted for splits. By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.
Response Attributes
afterHours
number
optional
The close price of the ticker symbol in after hours trading.
close
number
The close price for the symbol in the given time period.
from
string
The requested date.
high
number
The highest price for the symbol in the given time period.
low
number
The lowest price for the symbol in the given time period.
open
number
The open price for the symbol in the given time period.
otc
boolean
optional
Whether or not this aggregate is for an OTC ticker. This field will be left off if false.
preMarket
integer
optional
The open price of the ticker symbol in pre-market trading.
status
string
The status of this request's response.
symbol
string
The exchange symbol that this item is traded under.
volume
number
The trading volume of the symbol in the given time period.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

request = client.get_daily_open_close_agg(
    "AAPL",
    "2023-01-09",
    adjusted="true",
)

print(request)
Query URL
GET
https://api.polygon.io/v1/open-close/AAPL/2023-01-09?adjusted=true&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Daily Market Summary
Previous Day Bar
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Daily Ticker Summary (OHLC) | Stocks REST API - Polygon

{
  "afterHours": 322.1,
  "close": 325.12,
  "from": "2023-01-09",
  "high": 326.2,
  "low": 322.3,
  "open": 324.66,
  "preMarket": 324.5,
  "status": "OK",
  "symbol": "AAPL",
  "volume": 26122646
}


{
  "status": "OK",
  "from": "2023-01-09",
  "symbol": "AAPL",
  "open": 130.465,
  "high": 133.41,
  "low": 129.89,
  "close": 130.15,
  "volume": 70790813,
  "afterHours": 129.85,
  "preMarket": 129.6
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Aggregate Bars (OHLC)/
Previous Day Bar (OHLC)
Previous Day Bar (OHLC)
GET
/v2/aggs/ticker/{stocksTicker}/prev
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the previous trading day's open, high, low, and close (OHLC) data for a specified stock ticker. This endpoint provides key pricing metrics, including volume, to help users assess recent performance and inform trading strategies.

Use Cases: Baseline comparison, technical analysis, market research, and daily reporting.

Path Parameters
Reset values
stocksTicker
string
required
AAPL
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
Query Parameters
adjusted
boolean

true
Whether or not the results are adjusted for splits. By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.
Response Attributes
ticker
string
The exchange symbol that this item is traded under.
adjusted
boolean
Whether or not this response was adjusted for splits.
queryCount
integer
The number of aggregates (minute or day) used to generate the response.
request_id
string
A request id assigned by the server.
resultsCount
integer
The total number of results for this request.
status
string
The status of this request's response.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
c
number
The close price for the symbol in the given time period.
h
number
The highest price for the symbol in the given time period.
l
number
The lowest price for the symbol in the given time period.
n
integer
optional
The number of transactions in the aggregate window.
o
number
The open price for the symbol in the given time period.
t
integer
The Unix millisecond timestamp for the start of the aggregate window.
v
number
The trading volume of the symbol in the given time period.
vw
number
optional
The volume weighted average price.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

aggs = client.get_previous_close_agg(
    "AAPL",
    adjusted="true",
)

print(aggs)
Query URL
GET
https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "adjusted": true,
  "queryCount": 1,
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "T": "AAPL",
      "c": 115.97,
      "h": 117.59,
      "l": 114.13,
      "o": 115.55,
      "t": 1605042000000,
      "v": 131704427,
      "vw": 116.3058
    }
  ],
  "resultsCount": 1,
  "status": "OK",
  "ticker": "AAPL"
}
Daily Ticker Summary
Single Ticker Snapshot
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Previous Day Bar (OHLC) | Stocks REST API - Polygon


{
  "ticker": "AAPL",
  "queryCount": 1,
  "resultsCount": 1,
  "adjusted": true,
  "results": [
    {
      "T": "AAPL",
      "v": 73188571,
      "vw": 201.4224,
      "o": 201.89,
      "c": 201.08,
      "h": 203.22,
      "l": 200,
      "t": 1751054400000,
      "n": 596078
    }
  ],
  "status": "OK",
  "request_id": "8a5090d4dfbedfb536a5d8cc6e111676",
  "count": 1
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Snapshots/
Single Ticker Snapshot
Single Ticker Snapshot
GET
/v2/snapshot/locale/us/markets/stocks/tickers/{stocksTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the most recent market data snapshot for a single ticker. This endpoint consolidates the latest trade, quote, and aggregated data (minute, day, and previous day) for the specified ticker. Snapshot data is cleared at 3:30 AM EST and begins updating as exchanges report new information, which can start as early as 4:00 AM EST. By focusing on a single ticker, users can closely monitor real-time developments and incorporate up-to-date information into trading strategies, alerts, or company-level reporting.

Use Cases: Focused monitoring, real-time analysis, price alerts, investor relations.

Path Parameters
Reset values
stocksTicker
string
required
AAPL
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
Response Attributes
status
string
The status of this request's response.
request_id
string
A request id assigned by the server.
ticker
object
optional
Contains the requested snapshot data for the specified ticker.

Hide child attributes
day
object
optional
The most recent daily bar for this ticker.

Show child attributes
fmv
number
optional
Fair market value is only available on Business plans. It is our proprietary algorithm to generate a real-time, accurate, fair market value of a tradable security. For more information, contact us.
lastQuote
object
optional
The most recent quote for this ticker. This is only returned if your current plan includes quotes.

Show child attributes
lastTrade
object
optional
The most recent trade for this ticker. This is only returned if your current plan includes trades.

Show child attributes
min
object
optional
The most recent minute bar for this ticker.

Show child attributes
prevDay
object
optional
The previous day's bar for this ticker.

Show child attributes
ticker
string
optional
The exchange symbol that this item is traded under.
todaysChange
number
optional
The value of the change from the previous day.
todaysChangePerc
number
optional
The percentage change since the previous day.
updated
integer
optional
The last updated timestamp.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

ticker = client.get_snapshot_ticker(
	"stocks",
	"AAPL"
	)

print(ticker)
Query URL
GET
https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/AAPL?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Previous Day Bar
Full Market Snapshot
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Single Ticker Snapshot | Stocks REST API - Polygon

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Snapshots/
Single Ticker Snapshot
Single Ticker Snapshot
GET
/v2/snapshot/locale/us/markets/stocks/tickers/{stocksTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the most recent market data snapshot for a single ticker. This endpoint consolidates the latest trade, quote, and aggregated data (minute, day, and previous day) for the specified ticker. Snapshot data is cleared at 3:30 AM EST and begins updating as exchanges report new information, which can start as early as 4:00 AM EST. By focusing on a single ticker, users can closely monitor real-time developments and incorporate up-to-date information into trading strategies, alerts, or company-level reporting.

Use Cases: Focused monitoring, real-time analysis, price alerts, investor relations.

Path Parameters
Reset values
stocksTicker
string
required
AAPL
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.
Response Attributes
status
string
The status of this request's response.
request_id
string
A request id assigned by the server.
ticker
object
optional
Contains the requested snapshot data for the specified ticker.

Hide child attributes
day
object
optional
The most recent daily bar for this ticker.

Show child attributes
fmv
number
optional
Fair market value is only available on Business plans. It is our proprietary algorithm to generate a real-time, accurate, fair market value of a tradable security. For more information, contact us.
lastQuote
object
optional
The most recent quote for this ticker. This is only returned if your current plan includes quotes.

Show child attributes
lastTrade
object
optional
The most recent trade for this ticker. This is only returned if your current plan includes trades.

Show child attributes
min
object
optional
The most recent minute bar for this ticker.

Show child attributes
prevDay
object
optional
The previous day's bar for this ticker.

Show child attributes
ticker
string
optional
The exchange symbol that this item is traded under.
todaysChange
number
optional
The value of the change from the previous day.
todaysChangePerc
number
optional
The percentage change since the previous day.
updated
integer
optional
The last updated timestamp.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

ticker = client.get_snapshot_ticker(
	"stocks",
	"AAPL"
	)

print(ticker)
Query URL
GET
https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/AAPL?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Previous Day Bar
Full Market Snapshot
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Single Ticker Snapshot | Stocks REST API - Polygon

{
  "ticker": {
    "ticker": "AAPL",
    "todaysChangePerc": 0.0929850746268699,
    "todaysChange": 0.1869000000000085,
    "updated": 1751068800000000000,
    "day": {
      "o": 201.89,
      "h": 203.22,
      "l": 200,
      "c": 201.08,
      "v": 73185657,
      "vw": 201.4223
    },
    "min": {
      "av": 73185657,
      "t": 1751068740000,
      "n": 27,
      "o": 201.1874,
      "h": 201.1874,
      "l": 201.1869,
      "c": 201.1869,
      "v": 853,
      "vw": 201.1838
    },
    "prevDay": {
      "o": 201.43,
      "h": 202.64,
      "l": 199.46,
      "c": 201,
      "v": 50799121,
      "vw": 200.6328
    }
  },
  "status": "OK",
  "request_id": "f03e48e0793684db85d10ea440baabca"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Snapshots/
Full Market Snapshot
Full Market Snapshot
GET
/v2/snapshot/locale/us/markets/stocks/tickers
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve a comprehensive snapshot of the entire U.S. stock market, covering over 10,000+ actively traded tickers in a single response. This endpoint consolidates key information like pricing, volume, and trade activity to provide a full-market-snapshot view, eliminating the need for multiple queries. Snapshot data is cleared daily at 3:30 AM EST and begins to repopulate as exchanges report new data, which can start as early as 4:00 AM EST. By accessing all tickers at once, users can efficiently monitor broad market conditions, perform bulk analyses, and power applications that require complete, current market information.

Use Cases: Market overview, bulk data processing, heat maps/dashboards, automated monitoring.

Query Parameters
Reset values
tickers
array
A case-sensitive comma separated list of tickers to get snapshots for. For example, AAPL,TSLA,GOOG. Empty string defaults to querying all tickers.
include_otc
boolean

Select
Include OTC securities in the response. Default is false (don't include OTC securities).
Response Attributes
count
integer
optional
The total number of results for this request.
status
string
The status of this request's response.
tickers
array (object)
optional
An array of snapshot data for the specified tickers.

Hide child attributes
day
object
optional
The most recent daily bar for this ticker.

Show child attributes
fmv
number
optional
Fair market value is only available on Business plans. It is our proprietary algorithm to generate a real-time, accurate, fair market value of a tradable security. For more information, contact us.
lastQuote
object
optional
The most recent quote for this ticker. This is only returned if your current plan includes quotes.

Show child attributes
lastTrade
object
optional
The most recent trade for this ticker. This is only returned if your current plan includes trades.

Show child attributes
min
object
optional
The most recent minute bar for this ticker.

Show child attributes
prevDay
object
optional
The previous day's bar for this ticker.

Show child attributes
ticker
string
optional
The exchange symbol that this item is traded under.
todaysChange
number
optional
The value of the change from the previous day.
todaysChangePerc
number
optional
The percentage change since the previous day.
updated
integer
optional
The last updated timestamp.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient
from polygon.rest.models import (
    TickerSnapshot,
    Agg,
)

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

snapshot = client.get_snapshot_all(
	"stocks",
	)

print(snapshot)

# crunch some numbers
for item in snapshot:
    # verify this is an TickerSnapshot
    if isinstance(item, TickerSnapshot):
        # verify this is an Agg
        if isinstance(item.prev_day, Agg):
            # verify this is a float
            if isinstance(item.prev_day.open, float) and isinstance(
                item.prev_day.close, float
            ):
                percent_change = (
                    (item.prev_day.close - item.prev_day.open)
                    / item.prev_day.open
                    * 100
                )
                print(
                    "{:<15}{:<15}{:<15}{:.2f} %".format(
                        item.ticker,
                        item.prev_day.open,
                        item.prev_day.close,
                        percent_change,
                    )
                )
Query URL
GET
https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "status": "OK",
  "tickers": [
    {
      "day": {
        "c": 20.506,
        "h": 20.64,
        "l": 20.506,
        "o": 20.64,
        "v": 37216,
        "vw": 20.616
      },
      "lastQuote": {
        "P": 20.6,
        "S": 22,
        "p": 20.5,
        "s": 13,
        "t": 1605192959994246100
      },
      "lastTrade": {
        "c": [
          14,
          41
        ],
        "i": "71675577320245",
        "p": 20.506,
        "s": 2416,
        "t": 1605192894630916600,
        "x": 4
      },
      "min": {
        "av": 37216,
        "c": 20.506,
        "h": 20.506,
        "l": 20.506,
        "n": 1,
        "o": 20.506,
        "t": 1684428600000,
        "v": 5000,
        "vw": 20.5105
      },
      "prevDay": {
        "c": 20.63,
        "h": 21,
        "l": 20.5,
        "o": 20.79,
        "v": 292738,
        "vw": 20.6939
      },
      "ticker": "BCAT",
      "todaysChange": -0.124,
      "todaysChangePerc": -0.601,
      "updated": 1605192894630916600
    }
  ]
}
Single Ticker Snapshot
Unified Snapshot
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Full Market Snapshot | Stocks REST API - Polygon

{
  "tickers": [
    {
      "ticker": "MT",
      "todaysChangePerc": -1.2322274881516495,
      "todaysChange": -0.389999999999997,
      "updated": 1751065200001755400,
      "day": {
        "o": 31.42,
        "h": 31.62,
        "l": 30.7,
        "c": 31.26,
        "v": 1524719,
        "vw": 31.2489
      },
      "min": {
        "av": 1522793,
        "t": 1751056080000,
        "n": 1,
        "o": 31.26,
        "h": 31.26,
        "l": 31.26,
        "c": 31.26,
        "v": 200,
        "vw": 31.26
      },
      "prevDay": {
        "o": 31.41,
        "h": 31.74,
        "l": 31.37,
        "c": 31.65,
        "v": 962851,
        "vw": 31.5936
      }
    },
    {
      "ticker": "WVVIP",
      "todaysChangePerc": 0,
      "todaysChange": 0,
      "updated": 0,
      "day": {
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "min": {
        "av": 0,
        "t": 0,
        "n": 0,
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "prevDay": {
        "o": 3.11,
        "h": 3.18,
        "l": 3.1,
        "c": 3.1232,
        "v": 5242,
        "vw": 3.1113
      }
    },
    {
      "ticker": "CLCO",
      "todaysChangePerc": 0.8982035928143787,
      "todaysChange": 0.0600000000000005,
      "updated": 1751065200002698800,
      "day": {
        "o": 6.67,
        "h": 6.85,
        "l": 6.66,
        "c": 6.74,
        "v": 61256,
        "vw": 6.7501
      },
      "min": {
        "av": 59006,
        "t": 1751054340000,
        "n": 53,
        "o": 6.77,
        "h": 6.78,
        "l": 6.74,
        "c": 6.75,
        "v": 4339,
        "vw": 6.7592
      },
      "prevDay": {
        "o": 6.7,
        "h": 6.71,
        "l": 6.65,
        "c": 6.68,
        "v": 28234,
        "vw": 6.6889
      }
    },
    {
      "ticker": "PWB",
      "todaysChangePerc": 0.5640402637972975,
      "todaysChange": 0.6500000000000057,
      "updated": 1751068800071185400,
      "day": {
        "o": 115.61,
        "h": 116.49,
        "l": 115.44,
        "c": 115.89,
        "v": 108220,
        "vw": 116.0809
      },
      "min": {
        "av": 107905,
        "t": 1751054340000,
        "n": 14,
        "o": 115.91,
        "h": 115.91,
        "l": 115.87,
        "c": 115.88,
        "v": 1056,
        "vw": 115.8989
      },
      "prevDay": {
        "o": 114.63,
        "h": 115.2935,
        "l": 114.2909,
        "c": 115.24,
        "v": 43345,
        "vw": 114.9683
      }
    },
    {
      "ticker": "DNLI",
      "todaysChangePerc": -3.381642512077296,
      "todaysChange": -0.4900000000000002,
      "updated": 1751062500000000000,
      "day": {
        "o": 14.45,
        "h": 14.66,
        "l": 13.97,
        "c": 14.1,
        "v": 4086379,
        "vw": 14.1609
      },
      "min": {
        "av": 4086379,
        "t": 1751062440000,
        "n": 1,
        "o": 14,
        "h": 14,
        "l": 14,
        "c": 14,
        "v": 200,
        "vw": 14
      },
      "prevDay": {
        "o": 14.39,
        "h": 14.59,
        "l": 14.255,
        "c": 14.49,
        "v": 914970,
        "vw": 14.4209
      }
    },
    {
      "ticker": "VBF",
      "todaysChangePerc": -0.5164622336991612,
      "todaysChange": -0.08000000000000007,
      "updated": 1751065200000895700,
      "day": {
        "o": 15.46,
        "h": 15.56,
        "l": 15.31,
        "c": 15.41,
        "v": 116924,
        "vw": 15.3949
      },
      "min": {
        "av": 116920,
        "t": 1751054340000,
        "n": 11,
        "o": 15.4,
        "h": 15.41,
        "l": 15.37,
        "c": 15.41,
        "v": 641,
        "vw": 15.4021
      },
      "prevDay": {
        "o": 15.5,
        "h": 15.54,
        "l": 15.47,
        "c": 15.49,
        "v": 18032,
        "vw": 15.4913
      }
    },
    {
      "ticker": "XBP",
      "todaysChangePerc": 4.290322580645154,
      "todaysChange": 0.039899999999999936,
      "updated": 1751060040000000000,
      "day": {
        "o": 0.92,
        "h": 0.9499,
        "l": 0.9,
        "c": 0.9,
        "v": 89417,
        "vw": 0.917
      },
      "min": {
        "av": 89334,
        "t": 1751059980000,
        "n": 2,
        "o": 0.93,
        "h": 0.9699,
        "l": 0.93,
        "c": 0.9699,
        "v": 300,
        "vw": 0.9433
      },
      "prevDay": {
        "o": 1.06,
        "h": 1.11,
        "l": 0.9214,
        "c": 0.93,
        "v": 223274,
        "vw": 0.9954
      }
    },
    {
      "ticker": "CRBU",
      "todaysChangePerc": -5.918518518518525,
      "todaysChange": -0.07990000000000008,
      "updated": 1751068020000000000,
      "day": {
        "o": 1.38,
        "h": 1.38,
        "l": 1.26,
        "c": 1.26,
        "v": 12140690,
        "vw": 1.2666
      },
      "min": {
        "av": 12140665,
        "t": 1751067960000,
        "n": 1,
        "o": 1.2701,
        "h": 1.2701,
        "l": 1.2701,
        "c": 1.2701,
        "v": 1990,
        "vw": 1.2701
      },
      "prevDay": {
        "o": 1.42,
        "h": 1.42,
        "l": 1.295,
        "c": 1.35,
        "v": 1368014,
        "vw": 1.3415
      }
    },
    {
      "ticker": "GDVpH",
      "todaysChangePerc": 1.7817371937639295,
      "todaysChange": 0.40000000000000213,
      "updated": 1751065200003580200,
      "day": {
        "o": 22.46,
        "h": 22.9951,
        "l": 22.46,
        "c": 22.85,
        "v": 9281,
        "vw": 22.7236
      },
      "min": {
        "av": 9274,
        "t": 1751053080000,
        "n": 1,
        "o": 22.85,
        "h": 22.85,
        "l": 22.85,
        "c": 22.85,
        "v": 1000,
        "vw": 22.85
      },
      "prevDay": {
        "o": 22.61,
        "h": 22.61,
        "l": 22.35,
        "c": 22.45,
        "v": 12374,
        "vw": 22.4305
      }
    },
    {
      "ticker": "LODE",
      "todaysChangePerc": 0.25974025974025416,
      "todaysChange": 0.009999999999999787,
      "updated": 1751068800006408200,
      "day": {
        "o": 3.89,
        "h": 3.92,
        "l": 3.7078,
        "c": 3.86,
        "v": 368133,
        "vw": 3.8346
      },
      "min": {
        "av": 368098,
        "t": 1751055420000,
        "n": 2,
        "o": 3.91,
        "h": 3.91,
        "l": 3.91,
        "c": 3.91,
        "v": 199,
        "vw": 3.91
      },
      "prevDay": {
        "o": 3.5,
        "h": 3.85,
        "l": 3.45,
        "c": 3.85,
        "v": 346688,
        "vw": 3.7083
      }
    },
    {
      "ticker": "SPNT",
      "todaysChangePerc": -2.2988505747126458,
      "todaysChange": -0.4800000000000004,
      "updated": 1751065200002892300,
      "day": {
        "o": 20.81,
        "h": 21,
        "l": 20.31,
        "c": 20.4,
        "v": 1735599,
        "vw": 20.4608
      },
      "min": {
        "av": 1483123,
        "t": 1751055060000,
        "n": 3,
        "o": 20.4,
        "h": 20.4,
        "l": 20.4,
        "c": 20.4,
        "v": 12455,
        "vw": 20.4
      },
      "prevDay": {
        "o": 19.95,
        "h": 21.03,
        "l": 19.835,
        "c": 20.88,
        "v": 1103938,
        "vw": 20.7397
      }
    },
    {
      "ticker": "MNDR",
      "todaysChangePerc": -0.9812667261373684,
      "todaysChange": -0.010999999999999899,
      "updated": 1751055000000000000,
      "day": {
        "o": 1.12,
        "h": 1.1385,
        "l": 1.1,
        "c": 1.115,
        "v": 80617,
        "vw": 1.1203
      },
      "min": {
        "av": 80484,
        "t": 1751054940000,
        "n": 1,
        "o": 1.11,
        "h": 1.11,
        "l": 1.11,
        "c": 1.11,
        "v": 1050,
        "vw": 1.11
      },
      "prevDay": {
        "o": 1.24,
        "h": 1.27,
        "l": 1.08,
        "c": 1.121,
        "v": 329750,
        "vw": 1.1375
      }
    },
    {
      "ticker": "TWST",
      "todaysChangePerc": -2.734163508391982,
      "todaysChange": -1.009999999999998,
      "updated": 1751057340000000000,
      "day": {
        "o": 37.07,
        "h": 37.14,
        "l": 35.13,
        "c": 35.93,
        "v": 1563156,
        "vw": 35.9372
      },
      "min": {
        "av": 1563095,
        "t": 1751057280000,
        "n": 1,
        "o": 35.93,
        "h": 35.93,
        "l": 35.93,
        "c": 35.93,
        "v": 160,
        "vw": 35.93
      },
      "prevDay": {
        "o": 36.64,
        "h": 37.48,
        "l": 36.08,
        "c": 36.94,
        "v": 801684,
        "vw": 36.9433
      }
    },
    {
      "ticker": "LQDB",
      "todaysChangePerc": -0.04788263895795799,
      "todaysChange": -0.041399999999995885,
      "updated": 1751068800005010000,
      "day": {
        "o": 86.4437,
        "h": 86.4437,
        "l": 86.4103,
        "c": 86.42,
        "v": 478,
        "vw": 86.4329
      },
      "min": {
        "av": 473,
        "t": 1751054340000,
        "n": 1,
        "o": 86.42,
        "h": 86.42,
        "l": 86.42,
        "c": 86.42,
        "v": 116,
        "vw": 86.42
      },
      "prevDay": {
        "o": 86.4614,
        "h": 86.4614,
        "l": 86.4614,
        "c": 86.4614,
        "v": 168,
        "vw": 86.2597
      }
    },
    {
      "ticker": "PAYX",
      "todaysChangePerc": 1.9360329054677101,
      "todaysChange": 2.730000000000018,
      "updated": 1751057700000000000,
      "day": {
        "o": 141.21,
        "h": 144.555,
        "l": 140.83,
        "c": 143.94,
        "v": 3850031,
        "vw": 143.6005
      },
      "min": {
        "av": 3849752,
        "t": 1751057640000,
        "n": 6,
        "o": 143.74,
        "h": 143.74,
        "l": 143.74,
        "c": 143.74,
        "v": 221,
        "vw": 143.7419
      },
      "prevDay": {
        "o": 138.5,
        "h": 141.285,
        "l": 138.1,
        "c": 141.01,
        "v": 3931464,
        "vw": 140.3253
      }
    },
    {
      "ticker": "FWRD",
      "todaysChangePerc": 3.6685902720527492,
      "todaysChange": 0.889999999999997,
      "updated": 1751055420000000000,
      "day": {
        "o": 24.3,
        "h": 25.37,
        "l": 24.08,
        "c": 25.15,
        "v": 1075495,
        "vw": 24.9622
      },
      "min": {
        "av": 921714,
        "t": 1751055360000,
        "n": 1,
        "o": 25.15,
        "h": 25.15,
        "l": 25.15,
        "c": 25.15,
        "v": 1616,
        "vw": 25.15
      },
      "prevDay": {
        "o": 24.98,
        "h": 25.756,
        "l": 24.04,
        "c": 24.26,
        "v": 1017906,
        "vw": 24.6331
      }
    },
    {
      "ticker": "FTSD",
      "todaysChangePerc": 0.04624022899923108,
      "todaysChange": 0.04200000000000159,
      "updated": 1751068800073676000,
      "day": {
        "o": 90.96,
        "h": 90.96,
        "l": 90.8201,
        "c": 90.872,
        "v": 8773,
        "vw": 90.8864
      },
      "min": {
        "av": 8736,
        "t": 1751054340000,
        "n": 1,
        "o": 90.872,
        "h": 90.872,
        "l": 90.872,
        "c": 90.872,
        "v": 177,
        "vw": 90.872
      },
      "prevDay": {
        "o": 90.76,
        "h": 90.94,
        "l": 90.75,
        "c": 90.83,
        "v": 8342,
        "vw": 90.8228
      }
    },
    {
      "ticker": "VSGX",
      "todaysChangePerc": 0.41532071988924163,
      "todaysChange": 0.269999999999996,
      "updated": 1751068806381196000,
      "day": {
        "o": 65.2,
        "h": 65.5192,
        "l": 65.06,
        "c": 65.28,
        "v": 79220,
        "vw": 65.296
      },
      "min": {
        "av": 79220,
        "t": 1751058060000,
        "n": 1,
        "o": 65.5,
        "h": 65.5,
        "l": 65.5,
        "c": 65.5,
        "v": 120,
        "vw": 65.5
      },
      "prevDay": {
        "o": 64.93,
        "h": 65.1,
        "l": 64.7419,
        "c": 65.01,
        "v": 132464,
        "vw": 65.0054
      }
    },
    {
      "ticker": "CFG",
      "todaysChangePerc": 0.7026291931097061,
      "todaysChange": 0.3100000000000023,
      "updated": 1751065200003062800,
      "day": {
        "o": 44.19,
        "h": 44.6,
        "l": 44.035,
        "c": 44.43,
        "v": 7483626,
        "vw": 44.3847
      },
      "min": {
        "av": 7483462,
        "t": 1751058840000,
        "n": 7,
        "o": 44.44,
        "h": 44.44,
        "l": 44.42,
        "c": 44.42,
        "v": 2051,
        "vw": 44.4281
      },
      "prevDay": {
        "o": 43.38,
        "h": 44.23,
        "l": 43.33,
        "c": 44.12,
        "v": 4707351,
        "vw": 43.9797
      }
    },
    {
      "ticker": "ROBT",
      "todaysChangePerc": 0.124947938359007,
      "todaysChange": 0.05999999999999517,
      "updated": 1751055300010762200,
      "day": {
        "o": 48.3,
        "h": 48.4599,
        "l": 47.6774,
        "c": 48.08,
        "v": 47143,
        "vw": 48.2391
      },
      "min": {
        "av": 46638,
        "t": 1751053980000,
        "n": 1,
        "o": 47.92,
        "h": 47.92,
        "l": 47.92,
        "c": 47.92,
        "v": 104,
        "vw": 47.92
      },
      "prevDay": {
        "o": 47.3,
        "h": 48.05,
        "l": 47.3,
        "c": 48.02,
        "v": 53210,
        "vw": 47.7892
      }
    },
    {
      "ticker": "CEPT",
      "todaysChangePerc": -1.0938924339106746,
      "todaysChange": -0.120000000000001,
      "updated": 1751057880000000000,
      "day": {
        "o": 10.955,
        "h": 11.05,
        "l": 10.9,
        "c": 10.91,
        "v": 75100,
        "vw": 10.943
      },
      "min": {
        "av": 75079,
        "t": 1751057820000,
        "n": 1,
        "o": 10.85,
        "h": 10.85,
        "l": 10.85,
        "c": 10.85,
        "v": 100,
        "vw": 10.85
      },
      "prevDay": {
        "o": 10.88,
        "h": 11.14,
        "l": 10.88,
        "c": 10.97,
        "v": 244079,
        "vw": 10.9792
      }
    },
    {
      "ticker": "DMAAU",
      "todaysChangePerc": 0.7751937984496131,
      "todaysChange": 0.08000000000000007,
      "updated": 1751053020000000000,
      "day": {
        "o": 10.32,
        "h": 10.4,
        "l": 10.32,
        "c": 10.4,
        "v": 373,
        "vw": 10.3702
      },
      "min": {
        "av": 373,
        "t": 1751052960000,
        "n": 1,
        "o": 10.4,
        "h": 10.4,
        "l": 10.4,
        "c": 10.4,
        "v": 207,
        "vw": 10.4
      },
      "prevDay": {
        "o": 10.32,
        "h": 10.32,
        "l": 10.32,
        "c": 10.32,
        "v": 120,
        "vw": 10.3243
      }
    },
    {
      "ticker": "IVLU",
      "todaysChangePerc": 0.9821976672805411,
      "todaysChange": 0.3200000000000003,
      "updated": 1751068800005037600,
      "day": {
        "o": 32.86,
        "h": 33,
        "l": 32.765,
        "c": 32.9,
        "v": 911617,
        "vw": 32.8717
      },
      "min": {
        "av": 911291,
        "t": 1751054340000,
        "n": 117,
        "o": 32.91,
        "h": 32.92,
        "l": 32.78,
        "c": 32.85,
        "v": 32602,
        "vw": 32.8762
      },
      "prevDay": {
        "o": 32.48,
        "h": 32.6,
        "l": 32.45,
        "c": 32.58,
        "v": 280644,
        "vw": 32.5492
      }
    },
    {
      "ticker": "RSPS",
      "todaysChangePerc": 0.1680672268907587,
      "todaysChange": 0.05000000000000071,
      "updated": 1751068800003987500,
      "day": {
        "o": 29.84,
        "h": 29.8829,
        "l": 29.68,
        "c": 29.8,
        "v": 53836,
        "vw": 29.8233
      },
      "min": {
        "av": 53598,
        "t": 1751054340000,
        "n": 2,
        "o": 29.79,
        "h": 29.792,
        "l": 29.79,
        "c": 29.792,
        "v": 1200,
        "vw": 29.7903
      },
      "prevDay": {
        "o": 29.8,
        "h": 29.8,
        "l": 29.68,
        "c": 29.75,
        "v": 67533,
        "vw": 29.7325
      }
    },
    {
      "ticker": "HLIT",
      "todaysChangePerc": 0.8492569002123149,
      "todaysChange": 0.08000000000000007,
      "updated": 1751068140000000000,
      "day": {
        "o": 9.45,
        "h": 9.53,
        "l": 9.31,
        "c": 9.49,
        "v": 3324476,
        "vw": 9.4775
      },
      "min": {
        "av": 3324476,
        "t": 1751068080000,
        "n": 2,
        "o": 9.4999,
        "h": 9.5,
        "l": 9.4999,
        "c": 9.5,
        "v": 1700,
        "vw": 9.4999
      },
      "prevDay": {
        "o": 9.25,
        "h": 9.455,
        "l": 9.155,
        "c": 9.42,
        "v": 940745,
        "vw": 9.3467
      }
    },
    {
      "ticker": "DAR",
      "todaysChangePerc": -0.4959540589924427,
      "todaysChange": -0.19000000000000483,
      "updated": 1751065200002022100,
      "day": {
        "o": 38.23,
        "h": 38.31,
        "l": 36.85,
        "c": 38.12,
        "v": 6698119,
        "vw": 37.7868
      },
      "min": {
        "av": 5937041,
        "t": 1751055180000,
        "n": 1,
        "o": 38.1212,
        "h": 38.1212,
        "l": 38.1212,
        "c": 38.1212,
        "v": 25411,
        "vw": 38.1212
      },
      "prevDay": {
        "o": 37.88,
        "h": 38.44,
        "l": 37.335,
        "c": 38.31,
        "v": 4209990,
        "vw": 38.0062
      }
    },
    {
      "ticker": "IBMR",
      "todaysChangePerc": 0.055586436909391516,
      "todaysChange": 0.013999999999999346,
      "updated": 1751068802680629200,
      "day": {
        "o": 25.19,
        "h": 25.21,
        "l": 25.185,
        "c": 25.2,
        "v": 20340,
        "vw": 25.1949
      },
      "min": {
        "av": 20238,
        "t": 1751054340000,
        "n": 5,
        "o": 25.195,
        "h": 25.195,
        "l": 25.195,
        "c": 25.195,
        "v": 310,
        "vw": 25.1968
      },
      "prevDay": {
        "o": 25.1693,
        "h": 25.2,
        "l": 25.1693,
        "c": 25.186,
        "v": 50600,
        "vw": 25.1885
      }
    },
    {
      "ticker": "BWEN",
      "todaysChangePerc": -0.5263157894736847,
      "todaysChange": -0.010000000000000009,
      "updated": 1751056800000000000,
      "day": {
        "o": 1.89,
        "h": 1.89,
        "l": 1.81,
        "c": 1.85,
        "v": 68001,
        "vw": 1.843
      },
      "min": {
        "av": 67973,
        "t": 1751056740000,
        "n": 1,
        "o": 1.89,
        "h": 1.89,
        "l": 1.89,
        "c": 1.89,
        "v": 320,
        "vw": 1.89
      },
      "prevDay": {
        "o": 1.88,
        "h": 1.91,
        "l": 1.81,
        "c": 1.9,
        "v": 77647,
        "vw": 1.8721
      }
    },
    {
      "ticker": "METU",
      "todaysChangePerc": 0.975499092558983,
      "todaysChange": 0.4299999999999997,
      "updated": 1751068560000000000,
      "day": {
        "o": 44.02,
        "h": 45.1,
        "l": 43.93,
        "c": 44.82,
        "v": 794269,
        "vw": 44.4451
      },
      "min": {
        "av": 794269,
        "t": 1751068500000,
        "n": 1,
        "o": 44.51,
        "h": 44.51,
        "l": 44.51,
        "c": 44.51,
        "v": 250,
        "vw": 44.51
      },
      "prevDay": {
        "o": 42.56,
        "h": 44.26,
        "l": 42.2,
        "c": 44.08,
        "v": 810355,
        "vw": 43.6028
      }
    },
    {
      "ticker": "XNTK",
      "todaysChangePerc": -0.23703947798658248,
      "todaysChange": -0.5581999999999994,
      "updated": 1751068800003635500,
      "day": {
        "o": 235.57,
        "h": 236.77,
        "l": 234.094,
        "c": 234.93,
        "v": 31662,
        "vw": 235.756
      },
      "min": {
        "av": 31655,
        "t": 1751055120000,
        "n": 1,
        "o": 235,
        "h": 235,
        "l": 235,
        "c": 235,
        "v": 100,
        "vw": 235
      },
      "prevDay": {
        "o": 233.7,
        "h": 235.535,
        "l": 233.31,
        "c": 235.4882,
        "v": 16146,
        "vw": 234.7493
      }
    },
    {
      "ticker": "OTRK",
      "todaysChangePerc": -45.5068887517993,
      "todaysChange": -0.4426,
      "updated": 1751068800000000000,
      "day": {
        "o": 0.53,
        "h": 0.59,
        "l": 0.5,
        "c": 0.5534,
        "v": 3324023,
        "vw": 0.5288
      },
      "min": {
        "av": 3324023,
        "t": 1751068740000,
        "n": 2,
        "o": 0.53,
        "h": 0.53,
        "l": 0.53,
        "c": 0.53,
        "v": 509,
        "vw": 0.53
      },
      "prevDay": {
        "o": 0.98,
        "h": 1,
        "l": 0.93,
        "c": 0.9726,
        "v": 83294,
        "vw": 0.9672
      }
    },
    {
      "ticker": "QYLG",
      "todaysChangePerc": 0.5788712011577429,
      "todaysChange": 0.16000000000000014,
      "updated": 1751065560000000000,
      "day": {
        "o": 27.7,
        "h": 27.8,
        "l": 27.61,
        "c": 27.72,
        "v": 27210,
        "vw": 27.7294
      },
      "min": {
        "av": 27210,
        "t": 1751065500000,
        "n": 1,
        "o": 27.8,
        "h": 27.8,
        "l": 27.8,
        "c": 27.8,
        "v": 100,
        "vw": 27.8
      },
      "prevDay": {
        "o": 27.48,
        "h": 27.64,
        "l": 27.48,
        "c": 27.64,
        "v": 11480,
        "vw": 27.5715
      }
    },
    {
      "ticker": "VBR",
      "todaysChangePerc": 0.24578831481387586,
      "todaysChange": 0.4800000000000182,
      "updated": 1751068800003884800,
      "day": {
        "o": 196.1,
        "h": 197.1687,
        "l": 194.6538,
        "c": 195.77,
        "v": 405443,
        "vw": 196.0186
      },
      "min": {
        "av": 405387,
        "t": 1751063040000,
        "n": 2,
        "o": 196.4588,
        "h": 196.4588,
        "l": 196.4588,
        "c": 196.4588,
        "v": 101,
        "vw": 196.4562
      },
      "prevDay": {
        "o": 193.84,
        "h": 195.605,
        "l": 193.27,
        "c": 195.29,
        "v": 338448,
        "vw": 194.8256
      }
    },
    {
      "ticker": "ACCO",
      "todaysChangePerc": 0.5617977528089892,
      "todaysChange": 0.020000000000000018,
      "updated": 1751065200002455300,
      "day": {
        "o": 3.56,
        "h": 3.625,
        "l": 3.545,
        "c": 3.58,
        "v": 816353,
        "vw": 3.5827
      },
      "min": {
        "av": 816353,
        "t": 1751061420000,
        "n": 1,
        "o": 3.524,
        "h": 3.524,
        "l": 3.524,
        "c": 3.524,
        "v": 300,
        "vw": 3.524
      },
      "prevDay": {
        "o": 3.51,
        "h": 3.59,
        "l": 3.48,
        "c": 3.56,
        "v": 954006,
        "vw": 3.5426
      }
    },
    {
      "ticker": "IMFL",
      "todaysChangePerc": 0.952380952380945,
      "todaysChange": 0.259999999999998,
      "updated": 1751068802894194700,
      "day": {
        "o": 27.45,
        "h": 27.594,
        "l": 27.38,
        "c": 27.56,
        "v": 16549,
        "vw": 27.4919
      },
      "min": {
        "av": 16543,
        "t": 1751054340000,
        "n": 4,
        "o": 27.56,
        "h": 27.56,
        "l": 27.56,
        "c": 27.56,
        "v": 203,
        "vw": 27.5588
      },
      "prevDay": {
        "o": 27.27,
        "h": 27.3999,
        "l": 26.92,
        "c": 27.3,
        "v": 10027,
        "vw": 27.1747
      }
    },
    {
      "ticker": "ESAB",
      "todaysChangePerc": -0.4782321899736134,
      "todaysChange": -0.5799999999999983,
      "updated": 1751065200002741200,
      "day": {
        "o": 121.63,
        "h": 123.16,
        "l": 119.79,
        "c": 120.7,
        "v": 297919,
        "vw": 121.0129
      },
      "min": {
        "av": 297297,
        "t": 1751055180000,
        "n": 1,
        "o": 120.7012,
        "h": 120.7012,
        "l": 120.7012,
        "c": 120.7012,
        "v": 2995,
        "vw": 120.7012
      },
      "prevDay": {
        "o": 119.98,
        "h": 121.56,
        "l": 119.16,
        "c": 121.28,
        "v": 296394,
        "vw": 120.7701
      }
    },
    {
      "ticker": "KIDZ",
      "todaysChangePerc": 2.055172413793107,
      "todaysChange": 0.0596000000000001,
      "updated": 1751066280000000000,
      "day": {
        "o": 2.84,
        "h": 2.98,
        "l": 2.84,
        "c": 2.94,
        "v": 130391,
        "vw": 2.9164
      },
      "min": {
        "av": 130391,
        "t": 1751066220000,
        "n": 1,
        "o": 2.9596,
        "h": 2.9596,
        "l": 2.9596,
        "c": 2.9596,
        "v": 3250,
        "vw": 2.9596
      },
      "prevDay": {
        "o": 3,
        "h": 3,
        "l": 2.88,
        "c": 2.9,
        "v": 124909,
        "vw": 2.9367
      }
    },
    {
      "ticker": "MGR",
      "todaysChangePerc": -2.294455066921608,
      "todaysChange": -0.4800000000000004,
      "updated": 1751065200003363800,
      "day": {
        "o": 20.56,
        "h": 20.66,
        "l": 20.44,
        "c": 20.44,
        "v": 25494,
        "vw": 20.5444
      },
      "min": {
        "av": 24280,
        "t": 1751054340000,
        "n": 5,
        "o": 20.48,
        "h": 20.48,
        "l": 20.48,
        "c": 20.48,
        "v": 273,
        "vw": 20.4805
      },
      "prevDay": {
        "o": 20.72,
        "h": 20.92,
        "l": 20.67,
        "c": 20.92,
        "v": 17921,
        "vw": 20.7582
      }
    },
    {
      "ticker": "CRWV",
      "todaysChangePerc": 1.2082489878542486,
      "todaysChange": 1.9099999999999966,
      "updated": 1751068800000000000,
      "day": {
        "o": 160.13,
        "h": 167.88,
        "l": 158.2,
        "c": 159.99,
        "v": 17437520,
        "vw": 163.2729
      },
      "min": {
        "av": 17437520,
        "t": 1751068740000,
        "n": 18,
        "o": 160,
        "h": 160,
        "l": 159.9001,
        "c": 159.99,
        "v": 998,
        "vw": 159.9544
      },
      "prevDay": {
        "o": 164.15,
        "h": 165.99,
        "l": 152.8892,
        "c": 158.08,
        "v": 17009603,
        "vw": 159.7245
      }
    },
    {
      "ticker": "NBDS",
      "todaysChangePerc": 0.48101731306456835,
      "todaysChange": 0.16219999999999857,
      "updated": 1751068800080649000,
      "day": {
        "o": 33.8824,
        "h": 33.8824,
        "l": 33.8824,
        "c": 33.8824,
        "v": 199,
        "vw": 33.8838
      },
      "min": {
        "av": 0,
        "t": 0,
        "n": 0,
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "prevDay": {
        "o": 33.7202,
        "h": 33.7202,
        "l": 33.7202,
        "c": 33.7202,
        "v": 192,
        "vw": 33.6736
      }
    },
    {
      "ticker": "LFBD",
      "todaysChangePerc": -0.4577552494227477,
      "todaysChange": -0.8031000000000006,
      "updated": 1751068803482205200,
      "day": {
        "o": 174.64,
        "h": 174.64,
        "l": 174.64,
        "c": 174.64,
        "v": 0,
        "vw": 0
      },
      "min": {
        "av": 0,
        "t": 0,
        "n": 0,
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "prevDay": {
        "o": 175.4431,
        "h": 175.4431,
        "l": 175.4431,
        "c": 175.4431,
        "v": 0,
        "vw": 0
      }
    },
    {
      "ticker": "OCSAW",
      "todaysChangePerc": 0,
      "todaysChange": 0,
      "updated": 0,
      "day": {
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "min": {
        "av": 0,
        "t": 0,
        "n": 0,
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "prevDay": {
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      }
    },
    {
      "ticker": "FATN",
      "todaysChangePerc": 1.9607843137254832,
      "todaysChange": 0.14999999999999947,
      "updated": 1751054400000000000,
      "day": {
        "o": 7.79,
        "h": 8.08,
        "l": 7.39,
        "c": 7.8,
        "v": 27730,
        "vw": 7.7571
      },
      "min": {
        "av": 25874,
        "t": 1751054340000,
        "n": 25,
        "o": 7.72,
        "h": 7.77,
        "l": 7.72,
        "c": 7.77,
        "v": 949,
        "vw": 7.7402
      },
      "prevDay": {
        "o": 7.5611,
        "h": 7.8,
        "l": 7.5,
        "c": 7.65,
        "v": 22609,
        "vw": 7.6415
      }
    },
    {
      "ticker": "DHC",
      "todaysChangePerc": -1.1204481792717098,
      "todaysChange": -0.040000000000000036,
      "updated": 1751055180000000000,
      "day": {
        "o": 3.55,
        "h": 3.64,
        "l": 3.5206,
        "c": 3.56,
        "v": 1526933,
        "vw": 3.5707
      },
      "min": {
        "av": 1439649,
        "t": 1751055120000,
        "n": 2,
        "o": 3.53,
        "h": 3.53,
        "l": 3.53,
        "c": 3.53,
        "v": 200,
        "vw": 3.5286
      },
      "prevDay": {
        "o": 3.52,
        "h": 3.6,
        "l": 3.505,
        "c": 3.57,
        "v": 857457,
        "vw": 3.5613
      }
    },
    {
      "ticker": "WALDW",
      "todaysChangePerc": 0.14306151645207849,
      "todaysChange": 0.00010000000000000286,
      "updated": 1751030520000000000,
      "day": {
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "min": {
        "av": 500,
        "t": 1751030460000,
        "n": 1,
        "o": 0.07,
        "h": 0.07,
        "l": 0.07,
        "c": 0.07,
        "v": 500,
        "vw": 0.07
      },
      "prevDay": {
        "o": 0.0565,
        "h": 0.0699,
        "l": 0.053,
        "c": 0.0699,
        "v": 760590,
        "vw": 0.05992
      }
    },
    {
      "ticker": "HAUZ",
      "todaysChangePerc": 0,
      "todaysChange": 0,
      "updated": 1751068800003185000,
      "day": {
        "o": 22.69,
        "h": 22.82,
        "l": 22.63,
        "c": 22.72,
        "v": 56530,
        "vw": 22.7666
      },
      "min": {
        "av": 56373,
        "t": 1751054340000,
        "n": 4,
        "o": 22.695,
        "h": 22.695,
        "l": 22.695,
        "c": 22.695,
        "v": 238,
        "vw": 22.6958
      },
      "prevDay": {
        "o": 22.76,
        "h": 22.77,
        "l": 22.62,
        "c": 22.72,
        "v": 54888,
        "vw": 22.7244
      }
    },
    {
      "ticker": "EVMT",
      "todaysChangePerc": 0.6131010003226889,
      "todaysChange": 0.09500000000000064,
      "updated": 1751055300010897000,
      "day": {
        "o": 15.59,
        "h": 15.59,
        "l": 15.59,
        "c": 15.59,
        "v": 19,
        "vw": 15.5534
      },
      "min": {
        "av": 0,
        "t": 0,
        "n": 0,
        "o": 0,
        "h": 0,
        "l": 0,
        "c": 0,
        "v": 0,
        "vw": 0
      },
      "prevDay": {
        "o": 15.4605,
        "h": 15.499,
        "l": 15.4605,
        "c": 15.495,
        "v": 475,
        "vw": 15.4884
      }
    },
    {
      "ticker": "GLDG",
      "todaysChangePerc": -2.845637583892617,
      "todaysChange": -0.021199999999999997,
      "updated": 1751068800003630000,
      "day": {
        "o": 0.7395,
        "h": 0.74,
        "l": 0.72,
        "c": 0.7238,
        "v": 521900,
        "vw": 0.7257
      },
      "min": {
        "av": 521899,
        "t": 1751065980000,
        "n": 2,
        "o": 0.721,
        "h": 0.721,
        "l": 0.721,
        "c": 0.721,
        "v": 301,
        "vw": 0.721
      },
      "prevDay": {
        "o": 0.7408,
        "h": 0.7489,
        "l": 0.74,
        "c": 0.745,
        "v": 314970,
        "vw": 0.7447
      }
    },
    {
      "ticker": "TTEK",
      "todaysChangePerc": -1.1339805825242701,
      "todaysChange": -0.4087999999999994,
      "updated": 1751055240000000000,
      "day": {
        "o": 36.22,
        "h": 36.23,
        "l": 35.55,
        "c": 35.64,
        "v": 2886001,
        "vw": 35.7277
      },
      "min": {
        "av": 2852023,
        "t": 1751055180000,
        "n": 2,
        "o": 35.6412,
        "h": 35.6412,
        "l": 35.6412,
        "c": 35.6412,
        "v": 8452,
        "vw": 35.6598
      },
      "prevDay": {
        "o": 36.25,
        "h": 36.54,
        "l": 35.74,
        "c": 36.05,
        "v": 2217606,
        "vw": 36.0522
      }
    },
    {
      "ticker": "BINC",
      "todaysChangePerc": -0.018950161076378844,
      "todaysChange": -0.010000000000005116,
      "updated": 1751068800063518000,
      "day": {
        "o": 52.74,
        "h": 52.8,
        "l": 52.72,
        "c": 52.76,
        "v": 982636,
        "vw": 52.7578
      },
      "min": {
        "av": 982636,
        "t": 1751055480000,
        "n": 1,
        "o": 52.6577,
        "h": 52.6577,
        "l": 52.6577,
        "c": 52.6577,
        "v": 115,
        "vw": 52.6577
      },
      "prevDay": {
        "o": 52.71,
        "h": 52.78,
        "l": 52.68,
        "c": 52.77,
        "v": 1178646,
        "vw": 52.7345
      }
    }
  ],
  "status": "OK",
  "request_id": "1625077028914115832c76d7c024b832",
  "count": 11505
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Snapshots/
Unified Snapshot
Unified Snapshot
GET
/v3/snapshot
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve unified snapshots of market data for multiple asset classes including stocks, options, forex, and cryptocurrencies in a single request. This endpoint consolidates key metrics such as last trade, last quote, open, high, low, close, and volume for a comprehensive view of current market conditions. By aggregating data from various sources into one response, users can efficiently monitor, compare, and act on information spanning multiple markets and asset types.

Use Cases: Cross-market analysis, diversified portfolio monitoring, global market insights, multi-asset trading strategies.

Query Parameters
Reset values
ticker
string
Search a range of tickers lexicographically.

Show filter modifiers
type
enum (string)

Select
Query by the type of asset.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 250.
sort
enum (string)

ticker
Sort field used for ordering.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
break_even_price
number
optional
The price of the underlying asset for the contract to break even. For a call, this value is (strike price + premium paid). For a put, this value is (strike price - premium paid).
details
object
optional
The details for this contract.

Show child attributes
error
string
optional
The error while looking for this ticker.
fmv
number
optional
Fair market value is only available on Business plans. It's it our proprietary algorithm to generate a real-time, accurate, fair market value of a tradable security. For more information, contact us.
greeks
object
optional
The greeks for this contract. There are certain circumstances where greeks will not be returned, such as options contracts that are deep in the money. See this article for more information.

Show child attributes
implied_volatility
number
optional
The market's forecast for the volatility of the underlying asset, based on this option's current price.
last_quote
object
optional
The most recent quote for this contract. This is only returned if your current plan includes quotes.

Show child attributes
last_trade
object
optional
The most recent quote for this contract. This is only returned if your current plan includes trades.

Show child attributes
market_status
string
optional
The market status for the market that trades this ticker. Possible values for stocks, options, crypto, and forex snapshots are open, closed, early_trading, or late_trading. Possible values for indices snapshots are regular_trading, closed, early_trading, and late_trading.
message
string
optional
The error message while looking for this ticker.
name
string
optional
The name of this contract.
open_interest
number
optional
The quantity of this contract held at the end of the last trading day.
session
object
optional
Comprehensive trading session metrics, detailing price changes, trading volume, and key price points (open, close, high, low) for the asset within the current trading day. Includes specific changes during early, regular, and late trading periods to enable detailed performance analysis and trend tracking.

Show child attributes
ticker
string
The ticker symbol for the asset.
type
enum (stocks, options, fx, crypto, indices)
optional
The asset class for this ticker.
underlying_asset
object
optional
Information on the underlying stock for this options contract. The market data returned depends on your current stocks plan.

Show child attributes
value
number
optional
Value of Index.
status
string
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript


from typing import cast, Iterator, Union
from urllib3 import HTTPResponse
from polygon import RESTClient
from polygon.rest.models import UniversalSnapshot, SnapshotMarketType

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

def print_snapshots(iterator: Union[Iterator[UniversalSnapshot], HTTPResponse]):
    snapshots = [s for s in iterator]

    print(f"count: {len(snapshots)}")

    for item in snapshots:
        print(item)


# it = client.list_universal_snapshots() # all tickers for all assets types in lexicographical order

it = client.list_universal_snapshots(
    ticker_any_of=[
        "AAPL",
        "O:AAPL230519C00055000",
        "DOES_NOT_EXIST",
        "X:1INCHUSD",
        "C:AEDAUD",
    ]
)
print_snapshots(it)

it = client.list_universal_snapshots(type="stocks", ticker_gt="A", ticker_lt="AAPL")
print_snapshots(it)

it = client.list_universal_snapshots(type="stocks", ticker_gte="AAPL", ticker_lte="ABB")
print_snapshots(it)

it = client.list_universal_snapshots(
    type="options",
    ticker_gte="O:AAPL230804C00050000",
    ticker_lte="O:AAPL230804C00070000",
)
print_snapshots(it)
Query URL
GET
https://api.polygon.io/v3/snapshot?order=asc&limit=10&sort=ticker&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Full Market Snapshot
Top Market Movers
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Unified Snapshot | Stocks REST API - Polygon




{
  "results": [
    {
      "market_status": "closed",
      "name": "Agilent Technologies Inc.",
      "ticker": "A",
      "type": "stocks",
      "session": {
        "change": 0,
        "change_percent": 0,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 119.17,
        "high": 120.21,
        "low": 118.18,
        "open": 120,
        "volume": 1734624,
        "previous_close": 119.17,
        "price": 119.17,
        "last_updated": 1751068800186485000,
        "vwap": 119.1506
      },
      "last_minute": {
        "close": 119.9891,
        "high": 119.9891,
        "low": 119.9891,
        "transactions": 1,
        "open": 119.9891,
        "volume": 500,
        "vwap": 119.9891,
        "last_updated": 1751068800186485000
      }
    },
    {
      "market_status": "closed",
      "name": "Alcoa Corporation",
      "ticker": "AA",
      "type": "stocks",
      "session": {
        "change": -0.021,
        "change_percent": -0.0738,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 28.47,
        "high": 29.9991,
        "low": 27.72,
        "open": 29.88,
        "volume": 9417341,
        "previous_close": 28.47,
        "price": 28.449,
        "last_updated": 1751068621167180000,
        "vwap": 28.6037
      },
      "last_minute": {
        "close": 28.449,
        "high": 28.449,
        "low": 28.449,
        "transactions": 1,
        "open": 28.449,
        "volume": 2000,
        "vwap": 28.449,
        "last_updated": 1751068621167180000
      }
    },
    {
      "market_status": "closed",
      "name": "Alternative Access First Priority CLO Bond ETF",
      "ticker": "AAA",
      "type": "stocks",
      "session": {
        "change": 0,
        "change_percent": 0,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 25.07,
        "high": 25.0758,
        "low": 25.02,
        "open": 25.0758,
        "volume": 3734,
        "previous_close": 25.07,
        "price": 25.07,
        "last_updated": 1751068801189807400,
        "vwap": 25.0468
      },
      "last_minute": {
        "close": 25.07,
        "high": 25.07,
        "low": 25.07,
        "transactions": 6,
        "open": 25.07,
        "volume": 500,
        "vwap": 25.07,
        "last_updated": 1751068801189807400
      }
    },
    {
      "market_status": "closed",
      "name": "ALTERNATIVE INVSTMENT TR",
      "ticker": "AAAIF",
      "type": "stocks",
      "session": {},
      "last_minute": {}
    },
    {
      "market_status": "closed",
      "name": "Goldman Sachs Physical Gold ETF Shares",
      "ticker": "AAAU",
      "type": "stocks",
      "session": {
        "change": 0,
        "change_percent": 0,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 32.3,
        "high": 32.425,
        "low": 32.15,
        "open": 32.16,
        "volume": 3655535,
        "previous_close": 32.3,
        "price": 32.3,
        "last_updated": 1751068801097779200,
        "vwap": 32.3268
      },
      "last_minute": {
        "close": 32.4,
        "high": 32.4,
        "low": 32.4,
        "transactions": 1,
        "open": 32.4,
        "volume": 2124,
        "vwap": 32.4,
        "last_updated": 1751068801097779200
      }
    },
    {
      "market_status": "closed",
      "name": "ASIA BROADBAND INC",
      "ticker": "AABB",
      "type": "stocks",
      "session": {
        "change": 0,
        "change_percent": 0,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 0.031,
        "high": 0.0312,
        "low": 0.029,
        "open": 0.03,
        "volume": 5423952,
        "previous_close": 0.031,
        "price": 0.031,
        "last_updated": 1751054404402759000,
        "vwap": 0.02984
      },
      "last_minute": {
        "close": 0.031,
        "high": 0.031,
        "low": 0.031,
        "transactions": 1,
        "open": 0.031,
        "volume": 888,
        "vwap": 0.031,
        "otc": true,
        "last_updated": 1751054404402759000
      }
    },
    {
      "market_status": "closed",
      "name": "AAREAL BANK AG",
      "ticker": "AABKF",
      "type": "stocks",
      "session": {},
      "last_minute": {}
    },
    {
      "market_status": "closed",
      "name": "ABERDEEN INTL INC",
      "ticker": "AABVF",
      "type": "stocks",
      "session": {
        "change": 0.00314,
        "change_percent": 11.939,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "previous_close": 0.0263,
        "price": 0.02944,
        "last_updated": 1750864851916802800
      },
      "last_minute": {
        "last_updated": 1750864851916802800
      }
    },
    {
      "market_status": "closed",
      "name": "AAC TECHS HLDGS INC ORD",
      "ticker": "AACAF",
      "type": "stocks",
      "session": {
        "change": 0.648,
        "change_percent": 14.305,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 4.53,
        "high": 4.82,
        "low": 4.53,
        "open": 4.82,
        "volume": 285,
        "previous_close": 4.53,
        "price": 5.178,
        "last_updated": 1751031000113971500,
        "vwap": 4.6394
      },
      "last_minute": {
        "close": 4.53,
        "high": 4.53,
        "low": 4.53,
        "transactions": 1,
        "open": 4.53,
        "volume": 160,
        "vwap": 4.53,
        "otc": true,
        "last_updated": 1751031000113971500
      }
    },
    {
      "market_status": "closed",
      "name": "AAC TECHS HLDGS UNSP/ADR",
      "ticker": "AACAY",
      "type": "stocks",
      "session": {
        "change": 0.0975,
        "change_percent": 1.935,
        "early_trading_change": 0,
        "early_trading_change_percent": 0,
        "regular_trading_change": 0,
        "regular_trading_change_percent": 0,
        "close": 5.039,
        "high": 5.117,
        "low": 5.039,
        "open": 5.117,
        "volume": 17809,
        "previous_close": 5.039,
        "price": 5.1365,
        "last_updated": 1751054102054794500,
        "vwap": 5.0632
      },
      "last_minute": {
        "close": 5.039,
        "high": 5.117,
        "low": 5.039,
        "transactions": 2,
        "open": 5.117,
        "volume": 17500,
        "vwap": 5.0613,
        "otc": true,
        "last_updated": 1751054102054794500
      }
    }
  ],
  "status": "OK",
  "request_id": "7bdf342fe3a4ba2a185d0ece4a5acd42",
  "next_url": "https://api.polygon.io/v3/snapshot?cursor=bGltaXQ9MTAmb3JkZXI9YXNjJnNvcnQ9dGlja2VyJnRpY2tlci5ndD1BQUNBWSZ0aWNrZXIubHRlPQ"
}

{
  "request_id": "abc123",
  "results": [
    {
      "break_even_price": 171.075,
      "details": {
        "contract_type": "call",
        "exercise_style": "american",
        "expiration_date": "2022-10-14",
        "shares_per_contract": 100,
        "strike_price": 5,
        "underlying_ticker": "NCLH"
      },
      "fmv": 0.05,
      "greeks": {
        "delta": 0.5520187372272933,
        "gamma": 0.00706756515659829,
        "theta": -0.018532772783847958,
        "vega": 0.7274811132998142
      },
      "implied_volatility": 0.3048997097864957,
      "last_quote": {
        "ask": 21.25,
        "ask_exchange": 12,
        "ask_size": 110,
        "bid": 20.9,
        "bid_exchange": 10,
        "bid_size": 172,
        "last_updated": 1636573458756383500,
        "midpoint": 21.075,
        "timeframe": "REAL-TIME"
      },
      "last_trade": {
        "conditions": [
          209
        ],
        "exchange": 316,
        "price": 0.05,
        "sip_timestamp": 1675280958783136800,
        "size": 2,
        "timeframe": "REAL-TIME"
      },
      "market_status": "closed",
      "name": "NCLH $5 Call",
      "open_interest": 8921,
      "session": {
        "change": -0.05,
        "change_percent": -1.07,
        "close": 6.65,
        "early_trading_change": -0.01,
        "early_trading_change_percent": -0.03,
        "high": 7.01,
        "late_trading_change": -0.4,
        "late_trading_change_percent": -0.02,
        "low": 5.42,
        "open": 6.7,
        "previous_close": 6.71,
        "regular_trading_change": -0.6,
        "regular_trading_change_percent": -0.5,
        "volume": 67
      },
      "ticker": "O:NCLH221014C00005000",
      "type": "options",
      "underlying_asset": {
        "change_to_break_even": 23.123999999999995,
        "last_updated": 1636573459862384600,
        "price": 147.951,
        "ticker": "AAPL",
        "timeframe": "REAL-TIME"
      }
    },
    {
      "fmv": 0.05,
      "last_minute": {
        "close": 412.05,
        "high": 412.1,
        "low": 412.05,
        "open": 412.1,
        "transactions": 26,
        "volume": 610,
        "vwap": 412.0881
      },
      "last_quote": {
        "ask": 21.25,
        "ask_exchange": 300,
        "ask_size": 110,
        "bid": 20.9,
        "bid_exchange": 323,
        "bid_size": 172,
        "last_updated": 1636573458756383500,
        "timeframe": "REAL-TIME"
      },
      "last_trade": {
        "conditions": [
          209
        ],
        "exchange": 316,
        "id": "4064",
        "last_updated": 1675280958783136800,
        "price": 0.05,
        "size": 2,
        "timeframe": "REAL-TIME"
      },
      "market_status": "closed",
      "name": "Apple Inc.",
      "session": {
        "change": -1.05,
        "change_percent": -4.67,
        "close": 21.4,
        "early_trading_change": -0.39,
        "early_trading_change_percent": -0.07,
        "high": 22.49,
        "late_trading_change": 1.2,
        "late_trading_change_percent": 3.92,
        "low": 21.35,
        "open": 22.49,
        "previous_close": 22.45,
        "volume": 37
      },
      "ticker": "AAPL",
      "type": "stocks"
    },
    {
      "error": "NOT_FOUND",
      "message": "Ticker not found.",
      "ticker": "TSLAAPL"
    }
  ],
  "status": "OK"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Snapshots/
Top Market Movers
Top Market Movers
GET
/v2/snapshot/locale/us/markets/stocks/{direction}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve snapshot data highlighting the top 20 gainers or losers in the U.S. stock market. Gainers are stocks with the largest percentage increase since the previous day’s close, and losers are those with the largest percentage decrease. To ensure meaningful insights, only tickers with a minimum trading volume of 10,000 are included. Snapshot data is cleared daily at 3:30 AM EST and begins repopulating as exchanges report new information, typically starting around 4:00 AM EST. By focusing on these market movers, users can quickly identify significant price shifts and monitor evolving market dynamics.

Use Cases: Market movers identification, trading strategies, market sentiment analysis, portfolio adjustments.

Path Parameters
Reset values
direction
enum (string)
required

gainers
The direction of the snapshot results to return.
Query Parameters
include_otc
boolean

Select
Include OTC securities in the response. Default is false (don't include OTC securities).
Response Attributes
status
string
The status of this request's response.
tickers
array (object)
optional
An array of snapshot data for the specified tickers.

Hide child attributes
day
object
optional
The most recent daily bar for this ticker.

Show child attributes
fmv
number
optional
Fair market value is only available on Business plans. It is our proprietary algorithm to generate a real-time, accurate, fair market value of a tradable security. For more information, contact us.
lastQuote
object
optional
The most recent quote for this ticker. This is only returned if your current plan includes quotes.

Show child attributes
lastTrade
object
optional
The most recent trade for this ticker. This is only returned if your current plan includes trades.

Show child attributes
min
object
optional
The most recent minute bar for this ticker.

Show child attributes
prevDay
object
optional
The previous day's bar for this ticker.

Show child attributes
ticker
string
optional
The exchange symbol that this item is traded under.
todaysChange
number
optional
The value of the change from the previous day.
todaysChangePerc
number
optional
The percentage change since the previous day.
updated
integer
optional
The last updated timestamp.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient
from polygon.rest.models import (
    TickerSnapshot,
)

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

tickers = client.get_snapshot_direction(
	"stocks",
	direction="gainers",
	)

#print(tickers)

# print ticker with % change
for item in tickers:
    # verify this is a TickerSnapshot
    if isinstance(item, TickerSnapshot):
        # verify this is a float
        if isinstance(item.todays_change_percent, float):
            print("{:<15}{:.2f} %".format(item.ticker, item.todays_change_percent))
Query URL
GET
https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Unified Snapshot
Trades
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Top Market Movers | Stocks REST API - Polygon

{
  "status": "OK",
  "tickers": [
    {
      "day": {
        "c": 14.2284,
        "h": 15.09,
        "l": 14.2,
        "o": 14.33,
        "v": 133963,
        "vw": 14.5311
      },
      "lastQuote": {
        "P": 14.44,
        "S": 11,
        "p": 14.2,
        "s": 25,
        "t": 1605195929997325600
      },
      "lastTrade": {
        "c": [
          63
        ],
        "i": "79372124707124",
        "p": 14.2284,
        "s": 536,
        "t": 1605195848258266000,
        "x": 4
      },
      "min": {
        "av": 133963,
        "c": 14.2284,
        "h": 14.325,
        "l": 14.2,
        "n": 5,
        "o": 14.28,
        "t": 1684428600000,
        "v": 6108,
        "vw": 14.2426
      },
      "prevDay": {
        "c": 0.73,
        "h": 0.799,
        "l": 0.73,
        "o": 0.75,
        "v": 1568097,
        "vw": 0.7721
      },
      "ticker": "PDS",
      "todaysChange": 13.498,
      "todaysChangePerc": 1849.096,
      "updated": 1605195848258266000
    }
  ]
}

{
  "tickers": [
    {
      "ticker": "LCFY",
      "todaysChangePerc": 223.52941176470588,
      "todaysChange": 5.7,
      "updated": 1751068800000000000,
      "day": {
        "o": 9.81,
        "h": 13.98,
        "l": 6.9,
        "c": 8.3,
        "v": 96031195,
        "vw": 9.1375
      },
      "min": {
        "av": 96031195,
        "t": 1751068740000,
        "n": 64,
        "o": 8.38,
        "h": 8.4,
        "l": 8.25,
        "c": 8.25,
        "v": 8357,
        "vw": 8.3574
      },
      "prevDay": {
        "o": 2.64,
        "h": 2.775,
        "l": 2.51,
        "c": 2.55,
        "v": 18829,
        "vw": 2.6292
      }
    },
    {
      "ticker": "BGLWW",
      "todaysChangePerc": 212.49999999999994,
      "todaysChange": 0.16999999999999998,
      "updated": 1751067420000000000,
      "day": {
        "o": 0.291,
        "h": 0.39,
        "l": 0.24,
        "c": 0.31,
        "v": 1803071,
        "vw": 0.3178
      },
      "min": {
        "av": 1803013,
        "t": 1751067360000,
        "n": 1,
        "o": 0.25,
        "h": 0.25,
        "l": 0.25,
        "c": 0.25,
        "v": 160,
        "vw": 0.25
      },
      "prevDay": {
        "o": 0.1,
        "h": 0.1,
        "l": 0.07,
        "c": 0.08,
        "v": 25900,
        "vw": 0.08301
      }
    },
    {
      "ticker": "BGL",
      "todaysChangePerc": 164.24664346096472,
      "todaysChange": 33.03,
      "updated": 1751062560000000000,
      "day": {
        "o": 77.65,
        "h": 114.99,
        "l": 50,
        "c": 62.5,
        "v": 391614,
        "vw": 90.79
      },
      "min": {
        "av": 389088,
        "t": 1751062500000,
        "n": 8,
        "o": 53.14,
        "h": 53.14,
        "l": 53.14,
        "c": 53.14,
        "v": 369,
        "vw": 53.3067
      },
      "prevDay": {
        "o": 20,
        "h": 30,
        "l": 17,
        "c": 20.11,
        "v": 32336,
        "vw": 23.7183
      }
    },
    {
      "ticker": "RCT",
      "todaysChangePerc": 102.51396648044692,
      "todaysChange": 1.468,
      "updated": 1751068800000000000,
      "day": {
        "o": 1.61,
        "h": 4.76,
        "l": 1.4801,
        "c": 3.24,
        "v": 78019327,
        "vw": 3.3406
      },
      "min": {
        "av": 78019327,
        "t": 1751068740000,
        "n": 15,
        "o": 2.97,
        "h": 2.97,
        "l": 2.85,
        "c": 2.9,
        "v": 2057,
        "vw": 2.8955
      },
      "prevDay": {
        "o": 1.45,
        "h": 1.6,
        "l": 1.41,
        "c": 1.432,
        "v": 163630,
        "vw": 1.6354
      }
    },
    {
      "ticker": "EDBLW",
      "todaysChangePerc": 82.99246501614641,
      "todaysChange": 0.07710000000000002,
      "updated": 1751055240000000000,
      "day": {
        "o": 0.1,
        "h": 0.1,
        "l": 0.099,
        "c": 0.1,
        "v": 11191,
        "vw": 0.1025
      },
      "min": {
        "av": 11191,
        "t": 1751055180000,
        "n": 5,
        "o": 0.17,
        "h": 0.17,
        "l": 0.17,
        "c": 0.17,
        "v": 500,
        "vw": 0.1695
      },
      "prevDay": {
        "o": 0.0899,
        "h": 0.093,
        "l": 0.08,
        "c": 0.0929,
        "v": 18343,
        "vw": 0.09124
      }
    },
    {
      "ticker": "LIDRW",
      "todaysChangePerc": 62.26415094339621,
      "todaysChange": 0.032999999999999995,
      "updated": 1751052060000000000,
      "day": {
        "o": 0.06,
        "h": 0.0898,
        "l": 0.06,
        "c": 0.086,
        "v": 243381,
        "vw": 0.07571
      },
      "min": {
        "av": 243381,
        "t": 1751052000000,
        "n": 2,
        "o": 0.0861,
        "h": 0.0861,
        "l": 0.086,
        "c": 0.086,
        "v": 10000,
        "vw": 0.08605
      },
      "prevDay": {
        "o": 0.052,
        "h": 0.053,
        "l": 0.0512,
        "c": 0.053,
        "v": 40196,
        "vw": 0.0527
      }
    },
    {
      "ticker": "ADNWW",
      "todaysChangePerc": 61.016949152542374,
      "todaysChange": 0.0036,
      "updated": 1751064600000000000,
      "day": {
        "o": 0.0057,
        "h": 0.006,
        "l": 0.0057,
        "c": 0.0059,
        "v": 137942,
        "vw": 0.005946
      },
      "min": {
        "av": 137942,
        "t": 1751064540000,
        "n": 1,
        "o": 0.0095,
        "h": 0.0095,
        "l": 0.0095,
        "c": 0.0095,
        "v": 294,
        "vw": 0.0095
      },
      "prevDay": {
        "o": 0.0059,
        "h": 0.0059,
        "l": 0.0058,
        "c": 0.0059,
        "v": 62868,
        "vw": 0.005896
      }
    },
    {
      "ticker": "SVREW",
      "todaysChangePerc": 58.10276679841898,
      "todaysChange": 0.014700000000000001,
      "updated": 1751052360000000000,
      "day": {
        "o": 0.0353,
        "h": 0.0578,
        "l": 0.03,
        "c": 0.04,
        "v": 56445,
        "vw": 0.05101
      },
      "min": {
        "av": 56369,
        "t": 1751052300000,
        "n": 1,
        "o": 0.04,
        "h": 0.04,
        "l": 0.04,
        "c": 0.04,
        "v": 100,
        "vw": 0.04
      },
      "prevDay": {
        "o": 0.0253,
        "h": 0.0253,
        "l": 0.0253,
        "c": 0.0253,
        "v": 712,
        "vw": 0.0253
      }
    },
    {
      "ticker": "SYTAW",
      "todaysChangePerc": 51.713564789677115,
      "todaysChange": 0.06476400000000002,
      "updated": 1751068500000000000,
      "day": {
        "o": 0.12,
        "h": 0.14,
        "l": 0.1,
        "c": 0.1248,
        "v": 47029,
        "vw": 0.1201
      },
      "min": {
        "av": 47029,
        "t": 1751068440000,
        "n": 1,
        "o": 0.19,
        "h": 0.19,
        "l": 0.19,
        "c": 0.19,
        "v": 500,
        "vw": 0.19
      },
      "prevDay": {
        "o": 0.1303,
        "h": 0.14,
        "l": 0.12,
        "c": 0.125236,
        "v": 20337,
        "vw": 0.1361
      }
    },
    {
      "ticker": "VERO",
      "todaysChangePerc": 47.72727272727271,
      "todaysChange": 1.0499999999999998,
      "updated": 1751068800000000000,
      "day": {
        "o": 2.23,
        "h": 2.24,
        "l": 2.15,
        "c": 2.18,
        "v": 4750085,
        "vw": 3.1198
      },
      "min": {
        "av": 4750085,
        "t": 1751068740000,
        "n": 150,
        "o": 3.2502,
        "h": 3.26,
        "l": 3.2,
        "c": 3.25,
        "v": 25725,
        "vw": 3.2389
      },
      "prevDay": {
        "o": 2.18,
        "h": 2.24,
        "l": 2.17,
        "c": 2.2,
        "v": 33141,
        "vw": 2.2021
      }
    },
    {
      "ticker": "SOND",
      "todaysChangePerc": 44.375,
      "todaysChange": 0.71,
      "updated": 1751068740000000000,
      "day": {
        "o": 1.78,
        "h": 2.58,
        "l": 1.65,
        "c": 2.27,
        "v": 4618717,
        "vw": 2.2643
      },
      "min": {
        "av": 4618717,
        "t": 1751068680000,
        "n": 7,
        "o": 2.35,
        "h": 2.35,
        "l": 2.31,
        "c": 2.31,
        "v": 1376,
        "vw": 2.344
      },
      "prevDay": {
        "o": 1.53,
        "h": 1.620029,
        "l": 1.5,
        "c": 1.6,
        "v": 53873,
        "vw": 1.5522
      }
    },
    {
      "ticker": "PSFE.WS",
      "todaysChangePerc": 43.47826086956523,
      "todaysChange": 0.006000000000000002,
      "updated": 1751065200003674000,
      "day": {
        "o": 0.0113,
        "h": 0.0199,
        "l": 0.0113,
        "c": 0.0198,
        "v": 196902,
        "vw": 0.01824
      },
      "min": {
        "av": 196902,
        "t": 1751049360000,
        "n": 8,
        "o": 0.0198,
        "h": 0.0198,
        "l": 0.0198,
        "c": 0.0198,
        "v": 9342,
        "vw": 0.0198
      },
      "prevDay": {
        "o": 0.0121,
        "h": 0.0175,
        "l": 0.0112,
        "c": 0.0138,
        "v": 183620,
        "vw": 0.01435
      }
    },
    {
      "ticker": "TGE.WS",
      "todaysChangePerc": 42.833333333333336,
      "todaysChange": 0.1542,
      "updated": 1751068800001600000,
      "day": {
        "o": 0.32,
        "h": 0.5784,
        "l": 0.3,
        "c": 0.5142,
        "v": 61630,
        "vw": 0.4829
      },
      "min": {
        "av": 61444,
        "t": 1751050080000,
        "n": 6,
        "o": 0.5142,
        "h": 0.5142,
        "l": 0.5142,
        "c": 0.5142,
        "v": 470,
        "vw": 0.5142
      },
      "prevDay": {
        "o": 0.35,
        "h": 0.39,
        "l": 0.32,
        "c": 0.36,
        "v": 2788,
        "vw": 0.3451
      }
    },
    {
      "ticker": "SERA",
      "todaysChangePerc": 42.42424242424242,
      "todaysChange": 0.8399999999999999,
      "updated": 1751068800000000000,
      "day": {
        "o": 2.09,
        "h": 4.09,
        "l": 2.0101,
        "c": 4.09,
        "v": 8673206,
        "vw": 3.5541
      },
      "min": {
        "av": 8673206,
        "t": 1751068740000,
        "n": 11,
        "o": 2.82,
        "h": 2.8201,
        "l": 2.8,
        "c": 2.82,
        "v": 2319,
        "vw": 2.8192
      },
      "prevDay": {
        "o": 2.02,
        "h": 2.0235,
        "l": 1.98,
        "c": 1.98,
        "v": 142513,
        "vw": 1.9937
      }
    },
    {
      "ticker": "AMIX",
      "todaysChangePerc": 39.2,
      "todaysChange": 0.49,
      "updated": 1751068800000000000,
      "day": {
        "o": 1.37,
        "h": 2.43,
        "l": 1.28,
        "c": 2.01,
        "v": 43505232,
        "vw": 1.8963
      },
      "min": {
        "av": 43505232,
        "t": 1751068740000,
        "n": 21,
        "o": 1.73,
        "h": 1.75,
        "l": 1.73,
        "c": 1.74,
        "v": 10994,
        "vw": 1.7351
      },
      "prevDay": {
        "o": 1.28,
        "h": 1.3,
        "l": 1.23,
        "c": 1.25,
        "v": 29027,
        "vw": 1.2481
      }
    },
    {
      "ticker": "EYEN",
      "todaysChangePerc": 38.15082382762992,
      "todaysChange": 3.0101000000000004,
      "updated": 1751068800000000000,
      "day": {
        "o": 8.38,
        "h": 12.37,
        "l": 8.04,
        "c": 10.88,
        "v": 6058116,
        "vw": 10.683
      },
      "min": {
        "av": 6058116,
        "t": 1751068740000,
        "n": 8,
        "o": 10.96,
        "h": 10.96,
        "l": 10.9001,
        "c": 10.9001,
        "v": 1212,
        "vw": 10.9338
      },
      "prevDay": {
        "o": 9.375,
        "h": 9.75,
        "l": 7.5031,
        "c": 7.89,
        "v": 1931889,
        "vw": 8.3527
      }
    },
    {
      "ticker": "AEVAW",
      "todaysChangePerc": 37.50000000000001,
      "todaysChange": 0.30000000000000004,
      "updated": 1751059800000000000,
      "day": {
        "o": 0.92,
        "h": 1.18,
        "l": 0.8,
        "c": 1.0655,
        "v": 258168,
        "vw": 0.9946
      },
      "min": {
        "av": 258168,
        "t": 1751059740000,
        "n": 2,
        "o": 1.1,
        "h": 1.1,
        "l": 1.1,
        "c": 1.1,
        "v": 1100,
        "vw": 1.1
      },
      "prevDay": {
        "o": 0.551,
        "h": 0.819,
        "l": 0.54,
        "c": 0.8,
        "v": 171844,
        "vw": 0.6808
      }
    },
    {
      "ticker": "IROHW",
      "todaysChangePerc": 33.998,
      "todaysChange": 0.016999,
      "updated": 1751054400000000000,
      "day": {
        "o": 0.05,
        "h": 0.067,
        "l": 0.0403,
        "c": 0.066999,
        "v": 122428,
        "vw": 0.05969
      },
      "min": {
        "av": 122428,
        "t": 1751054340000,
        "n": 9,
        "o": 0.065,
        "h": 0.067,
        "l": 0.065,
        "c": 0.066999,
        "v": 31295,
        "vw": 0.06699
      },
      "prevDay": {
        "o": 0.05,
        "h": 0.05,
        "l": 0.043499,
        "c": 0.05,
        "v": 5438,
        "vw": 0.05093
      }
    },
    {
      "ticker": "AENTW",
      "todaysChangePerc": 33.20000000000001,
      "todaysChange": 0.04980000000000001,
      "updated": 1751050200000000000,
      "day": {
        "o": 0.15,
        "h": 0.2,
        "l": 0.1499,
        "c": 0.1998,
        "v": 33515,
        "vw": 0.1842
      },
      "min": {
        "av": 33469,
        "t": 1751050140000,
        "n": 1,
        "o": 0.1998,
        "h": 0.1998,
        "l": 0.1998,
        "c": 0.1998,
        "v": 100,
        "vw": 0.1998
      },
      "prevDay": {
        "o": 0.1363,
        "h": 0.15,
        "l": 0.1225,
        "c": 0.15,
        "v": 16530,
        "vw": 0.141
      }
    },
    {
      "ticker": "GIBOW",
      "todaysChangePerc": 32.319391634980974,
      "todaysChange": 0.008499999999999997,
      "updated": 1751054340000000000,
      "day": {
        "o": 0.035,
        "h": 0.0375,
        "l": 0.034798,
        "c": 0.0348,
        "v": 78032,
        "vw": 0.0352
      },
      "min": {
        "av": 78032,
        "t": 1751054280000,
        "n": 6,
        "o": 0.034799,
        "h": 0.0348,
        "l": 0.034798,
        "c": 0.0348,
        "v": 2400,
        "vw": 0.0348
      },
      "prevDay": {
        "o": 0.038,
        "h": 0.038,
        "l": 0.0262,
        "c": 0.0263,
        "v": 34657,
        "vw": 0.03076
      }
    },
    {
      "ticker": "EPRX",
      "todaysChangePerc": 29.653679653679653,
      "todaysChange": 1.37,
      "updated": 1751065320000000000,
      "day": {
        "o": 4.68,
        "h": 5.4322,
        "l": 4.67,
        "c": 5.3,
        "v": 28436,
        "vw": 4.979
      },
      "min": {
        "av": 28125,
        "t": 1751065260000,
        "n": 10,
        "o": 5.99,
        "h": 5.99,
        "l": 5.99,
        "c": 5.99,
        "v": 616,
        "vw": 5.99
      },
      "prevDay": {
        "o": 4.67,
        "h": 4.6783,
        "l": 4.4,
        "c": 4.62,
        "v": 6045,
        "vw": 4.5625
      }
    }
  ],
  "status": "OK",
  "request_id": "36d1ca2faebe55fb443cde633dd0b0d2"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Technical Indicators/
Simple Moving Average (SMA)
Simple Moving Average (SMA)
GET
/v1/indicators/sma/{stockTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the Simple Moving Average (SMA) for a specified ticker over a defined time range. The SMA calculates the average price across a set number of periods, smoothing price fluctuations to reveal underlying trends and potential signals.

Use Cases: Trend analysis, trading signal generation (e.g., SMA crossovers), identifying support/resistance, and refining entry/exit timing.

Path Parameters
Reset values
stockTicker
string
required
AAPL
Specify a case-sensitive ticker symbol for which to get simple moving average (SMA) data. For example, AAPL represents Apple Inc.
Query Parameters
timestamp
string
Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.

Show filter modifiers
timespan
enum (string)

day
The size of the aggregate time window.
adjusted
boolean

true
Whether or not the aggregates used to calculate the simple moving average are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits.
window
integer
50
The window size used to calculate the simple moving average (SMA). i.e. a window size of 10 with daily aggregates would result in a 10 day moving average.
series_type
enum (string)

close
The price in the aggregate which will be used to calculate the simple moving average. i.e. 'close' will result in using close prices to calculate the simple moving average (SMA).
expand_underlying
boolean

Select
Whether or not to include the aggregates used to calculate this indicator in the response.
order
enum (string)

desc
The order in which to return the results, ordered by timestamp.
limit
integer
10
Limit the number of results returned, default is 10 and max is 5000
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
object
optional

Hide child attributes
underlying
object
optional

Show child attributes
values
array (object)
optional

Show child attributes
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

sma = client.get_sma(
    ticker="AAPL",
	timespan="day",
	adjusted="true",
	window="50",
	series_type="close",
	order="desc",
	limit="10",
)

print(sma)
Query URL
GET
https://api.polygon.io/v1/indicators/sma/AAPL?timespan=day&adjusted=true&window=50&series_type=close&order=desc&limit=10&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "next_url": "https://api.polygon.io/v1/indicators/sma/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "a47d1beb8c11b6ae897ab76cdbbf35a3",
  "results": {
    "underlying": {
      "aggregates": [
        {
          "c": 75.0875,
          "h": 75.15,
          "l": 73.7975,
          "n": 1,
          "o": 74.06,
          "t": 1577941200000,
          "v": 135647456,
          "vw": 74.6099
        },
        {
          "c": 74.3575,
          "h": 75.145,
          "l": 74.125,
          "n": 1,
          "o": 74.2875,
          "t": 1578027600000,
          "v": 146535512,
          "vw": 74.7026
        }
      ],
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2003-01-01/2022-07-25"
    },
    "values": [
      {
        "timestamp": 1517562000016,
        "value": 140.139
      }
    ]
  },
  "status": "OK"
}
Last Quote
EMA
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Simple Moving Average (SMA) | Stocks REST API - Polygon

{
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1063281600000/1751172542703?limit=235&sort=desc"
    },
    "values": [
      {
        "timestamp": 1750996800000,
        "value": 202.62220000000013
      },
      {
        "timestamp": 1750910400000,
        "value": 202.6434000000001
      },
      {
        "timestamp": 1750824000000,
        "value": 202.6738000000001
      },
      {
        "timestamp": 1750737600000,
        "value": 202.60560000000012
      },
      {
        "timestamp": 1750651200000,
        "value": 202.40800000000013
      },
      {
        "timestamp": 1750392000000,
        "value": 202.35500000000013
      },
      {
        "timestamp": 1750219200000,
        "value": 201.78340000000014
      },
      {
        "timestamp": 1750132800000,
        "value": 201.48100000000014
      },
      {
        "timestamp": 1750046400000,
        "value": 201.33580000000012
      },
      {
        "timestamp": 1749787200000,
        "value": 201.43120000000013
      }
    ]
  },
  "status": "OK",
  "request_id": "333693717a503c44415e1b228327577a",
  "next_url": "https://api.polygon.io/v1/indicators/sma/AAPL?cursor=YWRqdXN0ZWQ9dHJ1ZSZhcD0lN0IlMjJ2JTIyJTNBMCUyQyUyMm8lMjIlM0EwJTJDJTIyYyUyMiUzQTE5OS4yJTJDJTIyaCUyMiUzQTAlMkMlMjJsJTIyJTNBMCUyQyUyMnQlMjIlM0ExNzQ5NzAwODAwMDAwJTdEJmFzPSZleHBhbmRfdW5kZXJseWluZz1mYWxzZSZsaW1pdD0xMCZvcmRlcj1kZXNjJnNlcmllc190eXBlPWNsb3NlJnRpbWVzcGFuPWRheSZ0aW1lc3RhbXAubHQ9MTc0OTc4NzIwMDAwMCZ3aW5kb3c9NTA"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Technical Indicators/
Exponential Moving Average (EMA)
Exponential Moving Average (EMA)
GET
/v1/indicators/ema/{stockTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the Exponential Moving Average (EMA) for a specified ticker over a defined time range. The EMA places greater weight on recent prices, enabling quicker trend detection and more responsive signals.

Use Cases: Trend identification, EMA crossover signals, dynamic support/resistance levels, and adjusting strategies based on recent market volatility.

Path Parameters
Reset values
stockTicker
string
required
AAPL
Specify a case-sensitive ticker symbol for which to get exponential moving average (EMA) data. For example, AAPL represents Apple Inc.
Query Parameters
timestamp
string
Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.

Show filter modifiers
timespan
enum (string)

day
The size of the aggregate time window.
adjusted
boolean

true
Whether or not the aggregates used to calculate the exponential moving average are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits.
window
integer
50
The window size used to calculate the exponential moving average (EMA). i.e. a window size of 10 with daily aggregates would result in a 10 day moving average.
series_type
enum (string)

close
The price in the aggregate which will be used to calculate the exponential moving average. i.e. 'close' will result in using close prices to calculate the exponential moving average (EMA).
expand_underlying
boolean

Select
Whether or not to include the aggregates used to calculate this indicator in the response.
order
enum (string)

desc
The order in which to return the results, ordered by timestamp.
limit
integer
10
Limit the number of results returned, default is 10 and max is 5000
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
object
optional

Hide child attributes
underlying
object
optional

Show child attributes
values
array (object)
optional

Show child attributes
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

ema = client.get_ema(
	ticker="AAPL",
	timespan="day",
	adjusted="true",
	window="50",
	series_type="close",
	order="desc",
	limit="10",
)

print(ema)
Query URL
GET
https://api.polygon.io/v1/indicators/ema/AAPL?timespan=day&adjusted=true&window=50&series_type=close&order=desc&limit=10&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
SMA
MACD
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Exponential Moving Average (EMA) | Stocks REST API - Polygon

{
  "next_url": "https://api.polygon.io/v1/indicators/ema/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "a47d1beb8c11b6ae897ab76cdbbf35a3",
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2003-01-01/2022-07-25"
    },
    "values": [
      {
        "timestamp": 1517562000016,
        "value": 140.139
      }
    ]
  },
  "status": "OK"
}

{
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1063281600000/1751172556429?limit=235&sort=desc"
    },
    "values": [
      {
        "timestamp": 1750996800000,
        "value": 203.85730006658503
      },
      {
        "timestamp": 1750910400000,
        "value": 203.97065925297625
      },
      {
        "timestamp": 1750824000000,
        "value": 204.0919106510569
      },
      {
        "timestamp": 1750737600000,
        "value": 204.19525394293677
      },
      {
        "timestamp": 1750651200000,
        "value": 204.35424389979133
      },
      {
        "timestamp": 1750392000000,
        "value": 204.4707436508032
      },
      {
        "timestamp": 1750219200000,
        "value": 204.61240665695843
      },
      {
        "timestamp": 1750132800000,
        "value": 204.94025998989548
      },
      {
        "timestamp": 1750046400000,
        "value": 205.31986243846265
      },
      {
        "timestamp": 1749787200000,
        "value": 205.60148947676726
      }
    ]
  },
  "status": "OK",
  "request_id": "4a7fc47a0bf53296a84d25a3c111befb",
  "next_url": "https://api.polygon.io/v1/indicators/ema/AAPL?cursor=YWRqdXN0ZWQ9dHJ1ZSZhcD0lN0IlMjJ2JTIyJTNBMCUyQyUyMm8lMjIlM0EwJTJDJTIyYyUyMiUzQTE5OS4yJTJDJTIyaCUyMiUzQTAlMkMlMjJsJTIyJTNBMCUyQyUyMnQlMjIlM0ExNzQ5NzAwODAwMDAwJTdEJmFzPSZleHBhbmRfdW5kZXJseWluZz1mYWxzZSZsaW1pdD0xMCZvcmRlcj1kZXNjJnNlcmllc190eXBlPWNsb3NlJnRpbWVzcGFuPWRheSZ0aW1lc3RhbXAubHQ9MTc0OTc4NzIwMDAwMCZ3aW5kb3c9NTA"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Technical Indicators/
Moving Average Convergence/Divergence (MACD)
Moving Average Convergence/Divergence (MACD)
GET
/v1/indicators/macd/{stockTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the Moving Average Convergence/Divergence (MACD) for a specified ticker over a defined time range. MACD is a momentum indicator derived from two moving averages, helping to identify trend strength, direction, and potential trading signals.

Use Cases: Momentum analysis, signal generation (crossover events), spotting overbought/oversold conditions, and confirming trend directions.

Path Parameters
Reset values
stockTicker
string
required
AAPL
Specify a case-sensitive ticker symbol for which to get moving average convergence/divergence (MACD) data. For example, AAPL represents Apple Inc.
Query Parameters
timestamp
string
Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.

Show filter modifiers
timespan
enum (string)

day
The size of the aggregate time window.
adjusted
boolean

true
Whether or not the aggregates used to calculate the MACD are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits.
short_window
integer
12
The short window size used to calculate MACD data.
long_window
integer
26
The long window size used to calculate MACD data.
signal_window
integer
9
The window size used to calculate the MACD signal line.
series_type
enum (string)

close
The price in the aggregate which will be used to calculate the MACD. i.e. 'close' will result in using close prices to calculate the MACD.
expand_underlying
boolean

Select
Whether or not to include the aggregates used to calculate this indicator in the response.
order
enum (string)

desc
The order in which to return the results, ordered by timestamp.
limit
integer
10
Limit the number of results returned, default is 10 and max is 5000
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
object
optional

Hide child attributes
underlying
object
optional

Show child attributes
values
array (object)
optional

Show child attributes
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

macd = client.get_macd(
    ticker="AAPL",
	timespan="day",
	adjusted="true",
	short_window="12",
	long_window="26",
	signal_window="9",
	series_type="close",
	order="desc",
	limit="10",
)

print(macd)
Query URL
GET
https://api.polygon.io/v1/indicators/macd/AAPL?timespan=day&adjusted=true&short_window=12&long_window=26&signal_window=9&series_type=close&order=desc&limit=10&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "next_url": "https://api.polygon.io/v1/indicators/macd/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "a47d1beb8c11b6ae897ab76cdbbf35a3",
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2003-01-01/2022-07-25"
    },
    "values": [
      {
        "histogram": 38.3801666667,
        "signal": 106.9811666667,
        "timestamp": 1517562000016,
        "value": 145.3613333333
      },
      {
        "histogram": 41.098859136,
        "signal": 102.7386283473,
        "timestamp": 1517562001016,
        "value": 143.8374874833
      }
    ]
  },
  "status": "OK"
}
EMA
RSI
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Moving Average Convergence/Divergence (MACD) | Stocks REST API - Polygon

{
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1063281600000/1751172581750?limit=129&sort=desc"
    },
    "values": [
      {
        "timestamp": 1750996800000,
        "value": -0.7545874115266145,
        "signal": -1.1988096991919783,
        "histogram": 0.44422228766536387
      },
      {
        "timestamp": 1750910400000,
        "value": -0.8883773822070395,
        "signal": -1.3098652711083192,
        "histogram": 0.42148788890127964
      },
      {
        "timestamp": 1750824000000,
        "value": -1.0380747283161327,
        "signal": -1.415237243333639,
        "histogram": 0.3771625150175064
      },
      {
        "timestamp": 1750737600000,
        "value": -1.2710618903925877,
        "signal": -1.5095278720880156,
        "histogram": 0.238465981695428
      },
      {
        "timestamp": 1750651200000,
        "value": -1.42165914976448,
        "signal": -1.5691443675118726,
        "histogram": 0.14748521774739265
      },
      {
        "timestamp": 1750392000000,
        "value": -1.71537915500258,
        "signal": -1.6060156719487206,
        "histogram": -0.10936348305385946
      },
      {
        "timestamp": 1750219200000,
        "value": -2.0144126285246102,
        "signal": -1.5786748011852558,
        "histogram": -0.4357378273393544
      },
      {
        "timestamp": 1750132800000,
        "value": -1.9167511692233177,
        "signal": -1.4697403443504171,
        "histogram": -0.44701082487290056
      },
      {
        "timestamp": 1750046400000,
        "value": -1.6685105259809063,
        "signal": -1.357987638132192,
        "histogram": -0.3105228878487143
      },
      {
        "timestamp": 1749787200000,
        "value": -1.6104504973190785,
        "signal": -1.2803569161700135,
        "histogram": -0.33009358114906506
      }
    ]
  },
  "status": "OK",
  "request_id": "ef90f2c736e31163e06b167950e6fb4e",
  "next_url": "https://api.polygon.io/v1/indicators/macd/AAPL?cursor=YWRqdXN0ZWQ9dHJ1ZSZhcD0lN0IlMjJ2JTIyJTNBMCUyQyUyMm8lMjIlM0EwJTJDJTIyYyUyMiUzQTE5OS4yJTJDJTIyaCUyMiUzQTAlMkMlMjJsJTIyJTNBMCUyQyUyMnQlMjIlM0ExNzQ5NzAwODAwMDAwJTdEJmFzPSZleHBhbmRfdW5kZXJseWluZz1mYWxzZSZsaW1pdD0xMCZsb25nX3dpbmRvdz0yNiZvcmRlcj1kZXNjJnNlcmllc190eXBlPWNsb3NlJnNob3J0X3dpbmRvdz0xMiZzaWduYWxfd2luZG93PTkmdGltZXNwYW49ZGF5JnRpbWVzdGFtcC5sdD0xNzQ5Nzg3MjAwMDAw"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Technical Indicators/
Relative Strength Index (RSI)
Relative Strength Index (RSI)
GET
/v1/indicators/rsi/{stockTicker}
Data is 15-minutes delayed. Upgrade to enable real-time data.
Retrieve the Relative Strength Index (RSI) for a specified ticker over a defined time range. The RSI measures the speed and magnitude of price changes, oscillating between 0 and 100 to help identify overbought or oversold conditions.

Use Cases: Overbought/oversold detection, divergence analysis, trend confirmation, and refining market entry/exit strategies.

Path Parameters
Reset values
stockTicker
string
required
AAPL
Specify a case-sensitive ticker symbol for which to get relative strength index (RSI) data. For example, AAPL represents Apple Inc.
Query Parameters
timestamp
string
Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.

Show filter modifiers
timespan
enum (string)

day
The size of the aggregate time window.
adjusted
boolean

true
Whether or not the aggregates used to calculate the relative strength index are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits.
window
integer
14
The window size used to calculate the relative strength index (RSI).
series_type
enum (string)

close
The price in the aggregate which will be used to calculate the relative strength index. i.e. 'close' will result in using close prices to calculate the relative strength index (RSI).
expand_underlying
boolean

Select
Whether or not to include the aggregates used to calculate this indicator in the response.
order
enum (string)

desc
The order in which to return the results, ordered by timestamp.
limit
integer
10
Limit the number of results returned, default is 10 and max is 5000
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
object
optional

Hide child attributes
underlying
object
optional

Show child attributes
values
array (object)
optional

Show child attributes
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

rsi = client.get_rsi(
    ticker="AAPL",
	timespan="day",
	adjusted="true",
	window="14",
	series_type="close",
	order="desc",
	limit="10",
)

print(rsi)
Query URL
GET
https://api.polygon.io/v1/indicators/rsi/AAPL?timespan=day&adjusted=true&window=14&series_type=close&order=desc&limit=10&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
MACD
Exchanges
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Relative Strength Index (RSI) | Stocks REST API - Polygon

{
  "next_url": "https://api.polygon.io/v1/indicators/rsi/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "a47d1beb8c11b6ae897ab76cdbbf35a3",
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2003-01-01/2022-07-25"
    },
    "values": [
      {
        "timestamp": 1517562000016,
        "value": 82.19
      }
    ]
  },
  "status": "OK"
}

{
  "results": {
    "underlying": {
      "url": "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/1063281600000/1751172598140?limit=75&sort=desc"
    },
    "values": [
      {
        "timestamp": 1750996800000,
        "value": 49.932997014935985
      },
      {
        "timestamp": 1750910400000,
        "value": 49.78407991034006
      },
      {
        "timestamp": 1750824000000,
        "value": 50.765546247710155
      },
      {
        "timestamp": 1750737600000,
        "value": 48.65050452405311
      },
      {
        "timestamp": 1750651200000,
        "value": 50.57175440246988
      },
      {
        "timestamp": 1750392000000,
        "value": 49.80481215222886
      },
      {
        "timestamp": 1750219200000,
        "value": 42.478503226654965
      },
      {
        "timestamp": 1750132800000,
        "value": 40.7713363391889
      },
      {
        "timestamp": 1750046400000,
        "value": 44.38922884816303
      },
      {
        "timestamp": 1749787200000,
        "value": 40.94076837528698
      }
    ]
  },
  "status": "OK",
  "request_id": "5de1f2b04f2471ff1e444add8cf80898",
  "next_url": "https://api.polygon.io/v1/indicators/rsi/AAPL?cursor=YWRqdXN0ZWQ9dHJ1ZSZhcD0lN0IlMjJ2JTIyJTNBMCUyQyUyMm8lMjIlM0EwJTJDJTIyYyUyMiUzQTE5OS4yJTJDJTIyaCUyMiUzQTAlMkMlMjJsJTIyJTNBMCUyQyUyMnQlMjIlM0ExNzQ5NzAwODAwMDAwJTdEJmFzPSZleHBhbmRfdW5kZXJseWluZz1mYWxzZSZsaW1pdD0xMCZvcmRlcj1kZXNjJnNlcmllc190eXBlPWNsb3NlJnRpbWVzcGFuPWRheSZ0aW1lc3RhbXAubHQ9MTc0OTc4NzIwMDAwMCZ3aW5kb3c9MTQ"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Market Operations/
Exchanges
Exchanges
GET
/v3/reference/exchanges
Retrieve a list of known exchanges, including their identifiers, names, market types, and other relevant attributes. This information helps map exchange codes, understand market coverage, and integrate exchange details into applications.

Use Cases: Data mapping, market coverage analysis, application development (e.g., display exchange options), and ensuring regulatory compliance.

Query Parameters
Reset values
asset_class
enum (string)

stocks
Filter by asset class.
locale
enum (string)

us
Filter by locale.
Response Attributes
count
integer
optional
The total number of results for this request.
request_id
string
A request ID assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
acronym
string
optional
A commonly used abbreviation for this exchange.
asset_class
enum (stocks, options, crypto, fx)
An identifier for a group of similar financial instruments.
id
integer
A unique identifier used by Polygon.io for this exchange.
locale
enum (us, global)
An identifier for a geographical location.
mic
string
optional
The Market Identifier Code of this exchange (see ISO 10383).
name
string
Name of this exchange.
operating_mic
string
optional
The MIC of the entity that operates this exchange.
participant_id
string
optional
The ID used by SIP's to represent this exchange.
type
enum (exchange, TRF, SIP)
Represents the type of exchange.
url
string
optional
A link to this exchange's website, if one exists.
status
string
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient
from polygon.rest.models import (
    Exchange,
)

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

exchanges = client.get_exchanges(
	asset_class="stocks",
	locale="us"
	)

print(exchanges)

# loop over exchanges
for exchange in exchanges:
    # verify this is an exchange
    if isinstance(exchange, Exchange):
        # print exchange info
        print(
            "{:<15}{} ({})".format(
                exchange.asset_class, exchange.name, exchange.operating_mic
            )
        )
Query URL
GET
https://api.polygon.io/v3/reference/exchanges?asset_class=stocks&locale=us&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": {
    "acronym": "AMEX",
    "asset_class": "stocks",
    "id": 1,
    "locale": "us",
    "mic": "XASE",
    "name": "NYSE American, LLC",
    "operating_mic": "XNYS",
    "participant_id": "A",
    "type": "exchange",
    "url": "https://www.nyse.com/markets/nyse-american"
  },
  "status": "OK"
}
RSI
Market Holidays
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Exchanges | Stocks REST API - Polygon

{
  "results": [
    {
      "id": 1,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "NYSE American, LLC",
      "acronym": "AMEX",
      "mic": "XASE",
      "operating_mic": "XNYS",
      "participant_id": "A",
      "url": "https://www.nyse.com/markets/nyse-american"
    },
    {
      "id": 2,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Nasdaq OMX BX, Inc.",
      "mic": "XBOS",
      "operating_mic": "XNAS",
      "participant_id": "B",
      "url": "https://www.nasdaq.com/solutions/nasdaq-bx-stock-market"
    },
    {
      "id": 3,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "NYSE National, Inc.",
      "acronym": "NSX",
      "mic": "XCIS",
      "operating_mic": "XNYS",
      "participant_id": "C",
      "url": "https://www.nyse.com/markets/nyse-national"
    },
    {
      "id": 4,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "FINRA Alternative Display Facility",
      "mic": "XADF",
      "operating_mic": "FINR",
      "participant_id": "D",
      "url": "https://www.finra.org"
    },
    {
      "id": 5,
      "type": "SIP",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Unlisted Trading Privileges",
      "operating_mic": "XNAS",
      "participant_id": "E",
      "url": "https://www.utpplan.com"
    },
    {
      "id": 6,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "International Securities Exchange, LLC - Stocks",
      "mic": "XISE",
      "operating_mic": "XNAS",
      "participant_id": "I",
      "url": "https://nasdaq.com/solutions/nasdaq-ise"
    },
    {
      "id": 7,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Cboe EDGA",
      "mic": "EDGA",
      "operating_mic": "XCBO",
      "participant_id": "J",
      "url": "https://www.cboe.com/us/equities"
    },
    {
      "id": 8,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Cboe EDGX",
      "mic": "EDGX",
      "operating_mic": "XCBO",
      "participant_id": "K",
      "url": "https://www.cboe.com/us/equities"
    },
    {
      "id": 9,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "NYSE Chicago, Inc.",
      "mic": "XCHI",
      "operating_mic": "XNYS",
      "participant_id": "M",
      "url": "https://www.nyse.com/markets/nyse-chicago"
    },
    {
      "id": 10,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "New York Stock Exchange",
      "mic": "XNYS",
      "operating_mic": "XNYS",
      "participant_id": "N",
      "url": "https://www.nyse.com"
    },
    {
      "id": 11,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "NYSE Arca, Inc.",
      "mic": "ARCX",
      "operating_mic": "XNYS",
      "participant_id": "P",
      "url": "https://www.nyse.com/markets/nyse-arca"
    },
    {
      "id": 12,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Nasdaq",
      "mic": "XNAS",
      "operating_mic": "XNAS",
      "participant_id": "T",
      "url": "https://www.nasdaq.com"
    },
    {
      "id": 13,
      "type": "SIP",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Consolidated Tape Association",
      "operating_mic": "XNYS",
      "participant_id": "S",
      "url": "https://www.nyse.com/data/cta"
    },
    {
      "id": 14,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Long-Term Stock Exchange",
      "mic": "LTSE",
      "operating_mic": "LTSE",
      "participant_id": "L",
      "url": "https://www.ltse.com"
    },
    {
      "id": 15,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Investors Exchange",
      "mic": "IEXG",
      "operating_mic": "IEXG",
      "participant_id": "V",
      "url": "https://www.iextrading.com"
    },
    {
      "id": 16,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Cboe Stock Exchange",
      "mic": "CBSX",
      "operating_mic": "XCBO",
      "participant_id": "W",
      "url": "https://www.cboe.com"
    },
    {
      "id": 17,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Nasdaq Philadelphia Exchange LLC",
      "mic": "XPHL",
      "operating_mic": "XNAS",
      "participant_id": "X",
      "url": "https://www.nasdaq.com/solutions/nasdaq-phlx"
    },
    {
      "id": 18,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Cboe BYX",
      "mic": "BATY",
      "operating_mic": "XCBO",
      "participant_id": "Y",
      "url": "https://www.cboe.com/us/equities"
    },
    {
      "id": 19,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Cboe BZX",
      "mic": "BATS",
      "operating_mic": "XCBO",
      "participant_id": "Z",
      "url": "https://www.cboe.com/us/equities"
    },
    {
      "id": 20,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "MIAX Pearl",
      "mic": "EPRL",
      "operating_mic": "MIHI",
      "participant_id": "H",
      "url": "https://www.miaxoptions.com/alerts/pearl-equities"
    },
    {
      "id": 21,
      "type": "exchange",
      "asset_class": "stocks",
      "locale": "us",
      "name": "Members Exchange",
      "mic": "MEMX",
      "operating_mic": "MEMX",
      "participant_id": "U",
      "url": "https://www.memx.com"
    },
    {
      "id": 62,
      "type": "ORF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "OTC Equity Security",
      "mic": "OOTC",
      "operating_mic": "FINR",
      "url": "https://www.finra.org/filing-reporting/over-the-counter-reporting-facility-orf"
    },
    {
      "id": 201,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "FINRA NYSE TRF",
      "mic": "FINY",
      "operating_mic": "FINR",
      "url": "https://www.finra.org"
    },
    {
      "id": 202,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "FINRA Nasdaq TRF Carteret",
      "mic": "FINN",
      "operating_mic": "FINR",
      "url": "https://www.finra.org"
    },
    {
      "id": 203,
      "type": "TRF",
      "asset_class": "stocks",
      "locale": "us",
      "name": "FINRA Nasdaq TRF Chicago",
      "mic": "FINC",
      "operating_mic": "FINR",
      "url": "https://www.finra.org"
    }
  ],
  "status": "OK",
  "request_id": "06df1abb49bf0813781be129ec09c4c6",
  "count": 25
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Corporate Actions/
Initial Public Offerings (IPOs)
Initial Public Offerings (IPOs)
GET
/vX/reference/ipos
Retrieve comprehensive information on Initial Public Offerings (IPOs), including upcoming and historical events, starting from the year 2008. This endpoint provides key details such as issuer name, ticker symbol, security type, IPO date, number of shares offered, expected price ranges, final issue prices, and offering sizes. Users can filter results by IPO status (e.g., pending, new, rumors, historical) to target their research and inform investment decisions.

Use Cases: IPO research, market trend analysis, investment screening, historical event comparison.

Query Parameters
Reset values
ticker
string
Specify a case-sensitive ticker symbol. For example, TSLA represents Tesla Inc.
us_code
string
Specify a us_code. This is a unique nine-character alphanumeric code that identifies a North American financial security for the purposes of facilitating clearing and settlement of trades.
isin
string
Specify an International Securities Identification Number (ISIN). This is a unique twelve-digit code that is assigned to every security issuance in the world.
listing_date
string
Specify a listing date. This is the first trading date for the newly listed entity.

Show filter modifiers
ipo_status
enum (string)

Select
Specify an IPO status.
order
enum (string)

desc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 1000.
sort
enum (string)

listing_date
Sort field used for ordering.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
announced_date
string
optional
The date when the IPO event was announced.
currency_code
string
optional
Underlying currency of the security.
final_issue_price
number
optional
The price set by the company and its underwriters before the IPO goes live.
highest_offer_price
number
optional
The highest price within the IPO price range that the company might use to price the shares.
ipo_status
enum (direct_listing_process, history, new, pending, postponed, rumor, withdrawn)
The status of the IPO event. IPO events start out as status "rumor" or "pending". On listing day, the status changes to "new". After the listing day, the status changes to "history".

The status "direct_listing_process" corresponds to a type of offering where, instead of going through all the IPO processes, the company decides to list its shares directly on an exchange, without using an investment bank or other intermediaries. This is called a direct listing, direct placement, or direct public offering (DPO).
isin
string
optional
International Securities Identification Number. This is a unique twelve-digit code that is assigned to every security issuance in the world.
issuer_name
string
Name of issuer.
last_updated
string
The date when the IPO event was last modified.
listing_date
string
optional
First trading date for the newly listed entity.
lot_size
number
optional
The minimum number of shares that can be bought or sold in a single transaction.
lowest_offer_price
number
optional
The lowest price within the IPO price range that the company is willing to offer its shares to investors.
max_shares_offered
number
optional
The upper limit of the shares that the company is offering to investors.
min_shares_offered
number
optional
The lower limit of shares that the company is willing to sell in the IPO.
primary_exchange
string
optional
Market Identifier Code (MIC) of the primary exchange where the security is listed. The Market Identifier Code (MIC) (ISO 10383) is a unique identification code used to identify securities trading exchanges, regulated and non-regulated trading markets.
security_description
string
optional
Description of the security.
security_type
string
The classification of the stock. For example, "CS" stands for Common Stock.
shares_outstanding
number
optional
The total number of shares that the company has issued and are held by investors.
ticker
string
The ticker symbol of the IPO event.
total_offer_size
number
optional
The total amount raised by the company for IPO.
us_code
string
optional
This is a unique nine-character alphanumeric code that identifies a North American financial security for the purposes of facilitating clearing and settlement of trades.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

ipos = []
for ipo in client.vx.list_ipos(
	order="desc",
	limit=10,
	sort="listing_date",
	):
    ipos.append(ipo)

print(ipos)
Query URL
GET
https://api.polygon.io/vX/reference/ipos?order=desc&limit=10&sort=listing_date&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "next_url": "https://api.polygon.io/vX/reference/ipos?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "announced_date": "2024-06-01",
      "currency_code": "USD",
      "final_issue_price": 17,
      "highest_offer_price": 17,
      "ipo_status": "history",
      "isin": "US75383L1026",
      "issue_end_date": "2024-06-06",
      "issue_start_date": "2024-06-01",
      "issuer_name": "Rapport Therapeutics Inc.",
      "last_updated": "2024-06-27",
      "listing_date": "2024-06-07",
      "lot_size": 100,
      "lowest_offer_price": 17,
      "max_shares_offered": 8000000,
      "min_shares_offered": 1000000,
      "primary_exchange": "XNAS",
      "security_description": "Ordinary Shares",
      "security_type": "CS",
      "shares_outstanding": 35376457,
      "ticker": "RAPP",
      "total_offer_size": 136000000,
      "us_code": "75383L102"
    }
  ],
  "status": "OK"
}
Condition Codes
Splits
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Initial Public Offerings (IPOs) | Stocks REST API - Polygon

{
  "results": [
    {
      "ticker": "BPAC",
      "last_updated": "2025-06-27",
      "announced_date": "2025-06-26",
      "issuer_name": "Blueport Acquisition Ltd.",
      "currency_code": "USD",
      "final_issue_price": 10,
      "max_shares_offered": 6900000,
      "lowest_offer_price": 10,
      "highest_offer_price": 10,
      "total_offer_size": 69000000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 7199000,
      "security_type": "SP",
      "lot_size": 100,
      "security_description": "Units 1 Ord Cls A  1 Rts",
      "ipo_status": "pending"
    },
    {
      "ticker": "CARL",
      "last_updated": "2025-06-27",
      "announced_date": "2025-06-26",
      "issuer_name": "Carlsmed Inc",
      "total_offer_size": 100000000,
      "primary_exchange": "XNAS",
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares",
      "ipo_status": "pending"
    },
    {
      "ticker": "CTW",
      "last_updated": "2025-06-27",
      "announced_date": "2025-05-15",
      "issuer_name": "CTW Cayman",
      "currency_code": "USD",
      "max_shares_offered": 3000000,
      "lowest_offer_price": 5,
      "highest_offer_price": 6,
      "total_offer_size": 18000000,
      "primary_exchange": "XNAS",
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares - Class A",
      "ipo_status": "pending"
    },
    {
      "ticker": "KMRK",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-19",
      "issuer_name": "K-Tech Solutions Company Ltd",
      "currency_code": "USD",
      "final_issue_price": 4,
      "max_shares_offered": 2000000,
      "lowest_offer_price": 4,
      "highest_offer_price": 5,
      "total_offer_size": 8000000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 17000000,
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares - Class A",
      "ipo_status": "pending"
    },
    {
      "ticker": "DXG",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-27",
      "issuer_name": "DeepGreenX Group Inc.",
      "primary_exchange": "XNAS",
      "security_type": "ADRC",
      "lot_size": 100,
      "security_description": "ADR",
      "ipo_status": "direct_listing_process"
    },
    {
      "ticker": "MAGH",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-28",
      "issuer_name": "Magnitude International Ltd.",
      "currency_code": "USD",
      "final_issue_price": 4.5,
      "max_shares_offered": 2200000,
      "lowest_offer_price": 4,
      "highest_offer_price": 5,
      "total_offer_size": 9900000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 35000000,
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares",
      "ipo_status": "pending"
    },
    {
      "ticker": "ETS",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-05",
      "issuer_name": "Elite Express Holding Inc",
      "currency_code": "USD",
      "final_issue_price": 4,
      "max_shares_offered": 4000000,
      "lowest_offer_price": 4,
      "highest_offer_price": 4,
      "total_offer_size": 16000000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 16916672,
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares - Class A",
      "ipo_status": "pending"
    },
    {
      "ticker": "YLY",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-16",
      "issuer_name": "Zi Yun Dong Fang Ltd.",
      "currency_code": "USD",
      "final_issue_price": 5,
      "max_shares_offered": 1500000,
      "lowest_offer_price": 4,
      "highest_offer_price": 6,
      "total_offer_size": 7500000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 16500000,
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares",
      "ipo_status": "pending"
    },
    {
      "ticker": "MEHA",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-30",
      "issuer_name": "Functional Brands Inc.",
      "currency_code": "USD",
      "primary_exchange": "XNAS",
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares",
      "ipo_status": "direct_listing_process"
    },
    {
      "ticker": "MCTA",
      "last_updated": "2025-06-25",
      "announced_date": "2025-05-14",
      "issuer_name": "Charming Medical Ltd.",
      "currency_code": "USD",
      "final_issue_price": 5,
      "max_shares_offered": 1600000,
      "lowest_offer_price": 4,
      "highest_offer_price": 6,
      "total_offer_size": 8000000,
      "primary_exchange": "XNAS",
      "shares_outstanding": 14938000,
      "security_type": "CS",
      "lot_size": 100,
      "security_description": "Ordinary Shares - Class A",
      "ipo_status": "pending"
    }
  ],
  "status": "OK",
  "request_id": "5ba1ed79d1c441ada4ebcdd2977d771b",
  "next_url": "https://api.polygon.io/vX/reference/ipos?cursor=YXA9MTAmYXM9JmxpbWl0PTEwJm9yZGVyPWRlc2Mmc29ydD1saXN0aW5nX2RhdGU"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Corporate Actions/
Splits
Splits
GET
/v3/reference/splits
Retrieve historical stock split events, including execution dates and ratio factors, to understand changes in a company’s share structure over time. Polygon.io leverages this data for accurate price adjustments in other endpoints, such as the Aggregates API, ensuring that users can access both adjusted and unadjusted views of historical prices for more informed analysis.

Use Cases: Historical analysis, price adjustments, data consistency, modeling.

Query Parameters
Reset values
ticker
string
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.

Show filter modifiers
execution_date
string
Query by execution date with the format YYYY-MM-DD.

Show filter modifiers
reverse_split
boolean

Select
Query for reverse stock splits. A split ratio where split_from is greater than split_to represents a reverse split. By default this filter is not used.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 1000.
sort
enum (string)

execution_date
Sort field used for ordering.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
execution_date
string
The execution date of the stock split. On this date the stock split was applied.
id
string
The unique identifier for this stock split.
split_from
number
The second number in the split ratio.

For example: In a 2-for-1 split, split_from would be 1.
split_to
number
The first number in the split ratio.

For example: In a 2-for-1 split, split_to would be 2.
ticker
string
The ticker symbol of the stock split.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

splits = []
for s in client.list_splits(
	order="asc",
	limit="10",
	sort="execution_date",
	):
    splits.append(s)

print(splits)
Query URL
GET
https://api.polygon.io/v3/reference/splits?order=asc&limit=10&sort=execution_date&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
IPOs
Dividends
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Splits | Stocks REST API - Polygon


{
  "next_url": "https://api.polygon.io/v3/splits/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "execution_date": "2020-08-31",
      "id": "E36416cce743c3964c5da63e1ef1626c0aece30fb47302eea5a49c0055c04e8d0",
      "split_from": 1,
      "split_to": 4,
      "ticker": "AAPL"
    },
    {
      "execution_date": "2005-02-28",
      "id": "E90a77bdf742661741ed7c8fc086415f0457c2816c45899d73aaa88bdc8ff6025",
      "split_from": 1,
      "split_to": 2,
      "ticker": "AAPL"
    }
  ],
  "status": "OK"
}

{
  "results": [
    {
      "execution_date": "1978-10-25",
      "id": "Pef962e8ce572df20933cdaac3a2d2d25e3a77cc910f2c84dbe66235bc780538b",
      "split_from": 2,
      "split_to": 3,
      "ticker": "AMD"
    },
    {
      "execution_date": "1979-10-24",
      "id": "Pdf33a5344081ff35ae801b4923f1a77b982de4889d6523bbcb28b043f7540044",
      "split_from": 2,
      "split_to": 3,
      "ticker": "AMD"
    },
    {
      "execution_date": "1980-10-23",
      "id": "Pfc705a25e20e6ea7c233b413c053a8c0647fb75b2f58e70f7f5a1092c4da6f6a",
      "split_from": 1,
      "split_to": 2,
      "ticker": "AMD"
    },
    {
      "execution_date": "1982-10-27",
      "id": "P020697a24101807bc62e730e553fb96770ee358a612fefb585bc451227bca7f5",
      "split_from": 2,
      "split_to": 3,
      "ticker": "AMD"
    },
    {
      "execution_date": "1983-08-22",
      "id": "Pe8be4f2e92217f0b107d842099c39e03932b234cfddfa854535b7d649a0309e5",
      "split_from": 1,
      "split_to": 2,
      "ticker": "AMD"
    },
    {
      "execution_date": "2000-08-21",
      "id": "Pa7425fc5c9d42ec147453a06a108073592af932af4c66b097aac744230c96b70",
      "split_from": 1,
      "split_to": 2,
      "ticker": "AMD"
    },
    {
      "execution_date": "2001-03-27",
      "id": "E77892217677df8086409e48efe46ad3cf723572480ca24ef97bc1d1bbd6fdae1",
      "split_from": 5,
      "split_to": 1,
      "ticker": "MDDC.E"
    },
    {
      "execution_date": "2001-04-24",
      "id": "E21e3079f85395e1bdf91d9b7cf82c171de29585146f031f474aa81b98022b17a",
      "split_from": 1,
      "split_to": 5,
      "ticker": "CRWE"
    },
    {
      "execution_date": "2001-05-07",
      "id": "E9141117579c726a97b5a56b5dbd7b0bdcc070582c5e5650d31f93146bb0c941d",
      "split_from": 1,
      "split_to": 16,
      "ticker": "AVNE"
    },
    {
      "execution_date": "2001-06-01",
      "id": "Edbffc52ef4dae72d004e8d0de91b4f90cb33be83d7e85a9054c449185ad42a2e",
      "split_from": 20,
      "split_to": 1,
      "ticker": "RSMI"
    }
  ],
  "status": "OK",
  "request_id": "02755f81d7ecfec7adf6c145da1166a8",
  "next_url": "https://api.polygon.io/v3/reference/splits?cursor=YXA9MTAmYXM9JmxpbWl0PTEwJm9yZGVyPWFzYyZzb3J0PWV4ZWN1dGlvbl9kYXRl"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Corporate Actions/
Dividends
Dividends
GET
/v3/reference/dividends
Retrieve a historical record of cash dividend distributions for a given ticker, including declaration, ex-dividend, record, and pay dates, as well as payout amounts and frequency. This endpoint consolidates key dividend information, enabling users to account for dividend income in returns, develop dividend-focused strategies, and support tax reporting needs.

Use Cases: Income analysis, total return calculations, dividend strategies, tax planning.

Query Parameters
Reset values
ticker
string
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.

Show filter modifiers
ex_dividend_date
string
Query by ex-dividend date with the format YYYY-MM-DD.

Show filter modifiers
record_date
string
Query by record date with the format YYYY-MM-DD.

Show filter modifiers
declaration_date
string
Query by declaration date with the format YYYY-MM-DD.

Show filter modifiers
pay_date
string
Query by pay date with the format YYYY-MM-DD.

Show filter modifiers
frequency
enum (integer)

Select
Query by the number of times per year the dividend is paid out. Possible values are 0 (one-time), 1 (annually), 2 (bi-annually), 4 (quarterly), 12 (monthly), 24 (bi-monthly), and 52 (weekly).
cash_amount
number
Query by the cash amount of the dividend.

Show filter modifiers
dividend_type
enum (string)

Select
Query by the type of dividend. Dividends that have been paid and/or are expected to be paid on consistent schedules are denoted as CD. Special Cash dividends that have been paid that are infrequent or unusual, and/or can not be expected to occur in the future are denoted as SC.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 1000.
sort
enum (string)

ex_dividend_date
Sort field used for ordering.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
cash_amount
number
The cash amount of the dividend per share owned.
currency
string
optional
The currency in which the dividend is paid.
declaration_date
string
optional
The date that the dividend was announced.
dividend_type
enum (CD, SC, LT, ST)
The type of dividend. Dividends that have been paid and/or are expected to be paid on consistent schedules are denoted as CD. Special Cash dividends that have been paid that are infrequent or unusual, and/or can not be expected to occur in the future are denoted as SC. Long-Term and Short-Term capital gain distributions are denoted as LT and ST, respectively.
ex_dividend_date
string
The date that the stock first trades without the dividend, determined by the exchange.
frequency
integer
The number of times per year the dividend is paid out. Possible values are 0 (one-time), 1 (annually), 2 (bi-annually), 4 (quarterly), 12 (monthly), 24 (bi-monthly), and 52 (weekly).
id
string
The unique identifier of the dividend.
pay_date
string
optional
The date that the dividend is paid out.
record_date
string
optional
The date that the stock must be held to receive the dividend, set by the company.
ticker
string
The ticker symbol of the dividend.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

dividends = []
for d in client.list_dividends(
	order="asc",
	limit=10,
	sort="ex_dividend_date",
	):
    dividends.append(d)

print(dividends)
Query URL
GET
https://api.polygon.io/v3/reference/dividends?order=asc&limit=10&sort=ex_dividend_date&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "next_url": "https://api.polygon.io/v3/reference/dividends/AAPL?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "cash_amount": 0.22,
      "declaration_date": "2021-10-28",
      "dividend_type": "CD",
      "ex_dividend_date": "2021-11-05",
      "frequency": 4,
      "id": "E8e3c4f794613e9205e2f178a36c53fcc57cdabb55e1988c87b33f9e52e221444",
      "pay_date": "2021-11-11",
      "record_date": "2021-11-08",
      "ticker": "AAPL"
    },
    {
      "cash_amount": 0.22,
      "declaration_date": "2021-07-27",
      "dividend_type": "CD",
      "ex_dividend_date": "2021-08-06",
      "frequency": 4,
      "id": "E6436c5475706773f03490acf0b63fdb90b2c72bfeed329a6eb4afc080acd80ae",
      "pay_date": "2021-08-12",
      "record_date": "2021-08-09",
      "ticker": "AAPL"
    }
  ],
  "status": "OK"
}
Splits
Ticker Events
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Dividends | Stocks REST API - Polygon



{
  "results": [
    {
      "cash_amount": 0.15,
      "currency": "CNY",
      "dividend_type": "CD",
      "ex_dividend_date": "2000-08-15",
      "frequency": 1,
      "id": "E4a7d4e17e772232caf90d14c98574c1e7b15c49c94246678bd28b603e0501954",
      "pay_date": "2000-08-18",
      "record_date": "2000-08-16",
      "ticker": "CHVKF"
    },
    {
      "cash_amount": 0.88,
      "currency": "SEK",
      "declaration_date": "2001-04-07",
      "dividend_type": "CD",
      "ex_dividend_date": "2001-04-27",
      "frequency": 1,
      "id": "E7cfbd720ca48876b5b9f73fd275225a676ac4c602efd8527eb43fed23c38cbd9",
      "pay_date": "2001-05-07",
      "record_date": "2001-05-01",
      "ticker": "ATLFF"
    },
    {
      "cash_amount": 0.18,
      "currency": "CNY",
      "dividend_type": "CD",
      "ex_dividend_date": "2001-08-17",
      "frequency": 1,
      "id": "Eafe5a76acea96143d1ef8cfa44f446412ae79b0c02b8bea48ffdec3abe2a0da3",
      "pay_date": "2001-08-22",
      "record_date": "2001-08-20",
      "ticker": "CHVKF"
    },
    {
      "cash_amount": 3,
      "currency": "CHF",
      "dividend_type": "SC",
      "ex_dividend_date": "2002-03-14",
      "frequency": 0,
      "id": "E05390cdcad9df75a07882ed8c0ae94d16cc576906e9847d24ee845e6f38de87a",
      "pay_date": "2002-03-26",
      "record_date": "2002-03-15",
      "ticker": "ALRHF"
    },
    {
      "cash_amount": 10,
      "currency": "JPY",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-03-26",
      "frequency": 2,
      "id": "E5442ecd732e66c0ef631abe85b89a936c6a070b97e17faa305edf432fc5af609",
      "pay_date": "2009-06-29",
      "record_date": "2009-03-31",
      "ticker": "CKOCF"
    },
    {
      "cash_amount": 0.19536,
      "currency": "USD",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-04-02",
      "frequency": 0,
      "id": "Ecc10cae727a4cd93ce4184e88e08ab36322def5d45c99d05e8bbfd32dd2a8a24",
      "pay_date": "2004-06-30",
      "record_date": "2002-04-04",
      "ticker": "TND"
    },
    {
      "cash_amount": 0.000024957,
      "currency": "USD",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-04-29",
      "frequency": 12,
      "id": "E4bd8545c881e9b33a093218c9e61ce0c05599025fb433d51a73d96a79636cc39",
      "pay_date": "2022-04-29",
      "record_date": "2022-04-29",
      "ticker": "SPIXX"
    },
    {
      "cash_amount": 0.92,
      "currency": "SEK",
      "declaration_date": "2002-04-10",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-04-30",
      "frequency": 1,
      "id": "Eb4097f526a983e7007efbb26cc8ba8b7a1607432e8bd45f060243bd7d45af79d",
      "pay_date": "2002-05-08",
      "record_date": "2002-05-01",
      "ticker": "ATLFF"
    },
    {
      "cash_amount": 0.2,
      "currency": "CNY",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-07-15",
      "frequency": 1,
      "id": "E0a100026b84e9417c21fee9f0f09d8f1244abd711b6a7072defda81438013f40",
      "pay_date": "2002-07-17",
      "record_date": "2002-07-16",
      "ticker": "CHVKF"
    },
    {
      "cash_amount": 0.255,
      "currency": "USD",
      "dividend_type": "CD",
      "ex_dividend_date": "2002-07-26",
      "frequency": 0,
      "id": "E4ecf658a5027ca66877c05e197bb5e4ee723989bf3fd5934e2252dc00f7f61d1",
      "record_date": "2002-07-30",
      "ticker": "GUJVY"
    }
  ],
  "status": "OK",
  "request_id": "45104991ced784689b0037e3813f57ac",
  "next_url": "https://api.polygon.io/v3/reference/dividends?cursor=YXA9MTAmYXM9JmxpbWl0PTEwJm9yZGVyPWFzYyZzb3J0PWV4X2RpdmlkZW5kX2RhdGU"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Corporate Actions/
Ticker Events
Ticker Events
GET
/vX/reference/tickers/{id}/events
This API endpoint is experimental.
Retrieve a timeline of key events associated with a given ticker, CUSIP, or Composite FIGI. This endpoint is experimental and highlights ticker changes, such as symbol renaming or rebranding, helping users maintain continuity in their records and analyses.

Use Cases: Historical reference for ticker symbol changes, data continuity, and record-keeping.

Path Parameters
Reset values
id
string
required
META
Identifier of an asset. This can currently be a Ticker, CUSIP, or Composite FIGI. When given a ticker, we return events for the entity currently represented by that ticker. To find events for entities previously associated with a ticker, find the relevant identifier using the Ticker Details Endpoint
Query Parameters
types
string
A comma-separated list of the types of event to include. Currently ticker_change is the only supported event_type. Leave blank to return all supported event_types.
Response Attributes
request_id
string
optional
A request id assigned by the server.
results
object
optional
Contains the requested event data for the specified ticker.

Hide child attributes
events
array (object)
optional
An array of event containing the requested data.

Show child attributes
name
string
optional
The name of the asset.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

events = client.get_ticker_events(
	"META",
	)

print(events)
Query URL
GET
https://api.polygon.io/vX/reference/tickers/META/events?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": {
    "events": [
      {
        "date": "2022-06-09",
        "ticker_change": {
          "ticker": "META"
        },
        "type": "ticker_change"
      },
      {
        "date": "2012-05-18",
        "ticker_change": {
          "ticker": "FB"
        },
        "type": "ticker_change"
      }
    ],
    "name": "Meta Platforms, Inc. Class A Common Stock"
  },
  "status": "OK"
}
Dividends
Financials
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Ticker Events | Stocks REST API - Polygon

{
  "results": {
    "name": "Meta Platforms, Inc. Class A Common Stock",
    "composite_figi": "BBG000MM2P62",
    "cik": "0001326801",
    "events": [
      {
        "ticker_change": {
          "ticker": "META"
        },
        "type": "ticker_change",
        "date": "2022-06-09"
      },
      {
        "ticker_change": {
          "ticker": "FB"
        },
        "type": "ticker_change",
        "date": "2012-05-18"
      }
    ]
  },
  "status": "OK",
  "request_id": "dd710835116fe12d26a26fab3a0ceb94"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Fundamentals/
Financials
Financials
GET
/vX/reference/financials
This API endpoint is experimental.
Retrieve historical financial data for a specified stock ticker, derived from company SEC filings and extracted via XBRL. This experimental endpoint provides a wide range of financial metrics, including income statements, balance sheets, cash flow statements, and comprehensive income figures. By examining these standardized, machine-readable financial details, users can conduct in-depth fundamental analysis, track corporate performance trends, and compare financials across different reporting periods.

Use Cases: Fundamental analysis, trend identification, cross-company comparisons, research & modeling.

Query Parameters
Reset values
ticker
string
Query by company ticker.
cik
string
Query by central index key (CIK) Number
company_name
string
Query by company name.

Show filter modifiers
sic
string
Query by standard industrial classification (SIC)
filing_date
string
Query by the date when the filing with financials data was filed in YYYY-MM-DD format.

Best used when querying over date ranges to find financials based on filings that happen in a time period.

Examples:

To get financials based on filings that have happened after January 1, 2009 use the query param filing_date.gte=2009-01-01

To get financials based on filings that happened in the year 2009 use the query params filing_date.gte=2009-01-01&filing_date.lt=2010-01-01

Show filter modifiers
period_of_report_date
string
The period of report for the filing with financials data in YYYY-MM-DD format.

Show filter modifiers
timeframe
enum (string)

Select
Query by timeframe. Annual financials originate from 10-K filings, and quarterly financials originate from 10-Q filings. Note: Most companies do not file quarterly reports for Q4 and instead include those financials in their annual report, so some companies my not return quarterly financials for Q4
include_sources
boolean

Select
Whether or not to include the `xpath` and `formula` attributes for each financial data point. See the `xpath` and `formula` response attributes for more info. False by default.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 100.
sort
enum (string)

filing_date
Sort field used for ordering.
Response Attributes
count
integer
The total number of results for this request.
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
A request id assigned by the server.
results
array (object)
An array of results containing the requested data.

Hide child attributes
acceptance_datetime
string
optional
The datetime (EST timezone) the filing was accepted by EDGAR in YYYYMMDDHHMMSS format.
cik
string
The CIK number for the company.
company_name
string
The company name.
end_date
string
optional
The end date of the period that these financials cover in YYYYMMDD format.
filing_date
string
optional
The date that the SEC filing which these financials were derived from was made available. Note that this is not necessarily the date when this information became public, as some companies may publish a press release before filing with the SEC.
financials
object
Structured financial statements with detailed data points and metadata.

Show child attributes
fiscal_period
string
Fiscal period of the report according to the company (Q1, Q2, Q3, Q4, or FY).
fiscal_year
string
optional
Fiscal year of the report according to the company.
sic
string
optional
The Standard Industrial Classification (SIC) code for the company.
source_filing_file_url
string
optional
The URL of the specific XBRL instance document within the SEC filing that these financials were derived from.
source_filing_url
string
optional
The URL of the SEC filing that these financials were derived from.
start_date
string
optional
The start date of the period that these financials cover in YYYYMMDD format.
tickers
array (string)
optional
The list of ticker symbols for the company.
timeframe
string
The timeframe of the report (quarterly, annual or ttm).
status
string
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

financials = []
for f in client.vx.list_stock_financials(
	order="asc",
	limit="10",
	sort="filing_date",
	):
    financials.append(f)

print(financials)
Query URL
GET
https://api.polygon.io/vX/reference/financials?order=asc&limit=10&sort=filing_date&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Ticker Events
Short Interest
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Financials | Stocks REST API - Polygon

{
  "count": 1,
  "next_url": "https://api.polygon.io/vX/reference/financials?",
  "request_id": "55eb92ed43b25568ab0cce159830ea34",
  "results": [
    {
      "cik": "0001650729",
      "company_name": "SiteOne Landscape Supply, Inc.",
      "end_date": "2022-04-03",
      "filing_date": "2022-05-04",
      "financials": {
        "balance_sheet": {
          "assets": {
            "label": "Assets",
            "order": 100,
            "unit": "USD",
            "value": 2407400000
          },
          "current_assets": {
            "label": "Current Assets",
            "order": 200,
            "unit": "USD",
            "value": 1385900000
          },
          "current_liabilities": {
            "label": "Current Liabilities",
            "order": 700,
            "unit": "USD",
            "value": 597500000
          },
          "equity": {
            "label": "Equity",
            "order": 1400,
            "unit": "USD",
            "value": 1099200000
          },
          "equity_attributable_to_noncontrolling_interest": {
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500,
            "unit": "USD",
            "value": 0
          },
          "equity_attributable_to_parent": {
            "label": "Equity Attributable To Parent",
            "order": 1600,
            "unit": "USD",
            "value": 1099200000
          },
          "liabilities": {
            "label": "Liabilities",
            "order": 600,
            "unit": "USD",
            "value": 1308200000
          },
          "liabilities_and_equity": {
            "label": "Liabilities And Equity",
            "order": 1900,
            "unit": "USD",
            "value": 2407400000
          },
          "noncurrent_assets": {
            "label": "Noncurrent Assets",
            "order": 300,
            "unit": "USD",
            "value": 1021500000
          },
          "noncurrent_liabilities": {
            "label": "Noncurrent Liabilities",
            "order": 800,
            "unit": "USD",
            "value": 710700000
          }
        },
        "cash_flow_statement": {
          "exchange_gains_losses": {
            "label": "Exchange Gains/Losses",
            "order": 1000,
            "unit": "USD",
            "value": 100000
          },
          "net_cash_flow": {
            "label": "Net Cash Flow",
            "order": 1100,
            "unit": "USD",
            "value": -8600000
          },
          "net_cash_flow_continuing": {
            "label": "Net Cash Flow, Continuing",
            "order": 1200,
            "unit": "USD",
            "value": -8700000
          },
          "net_cash_flow_from_financing_activities": {
            "label": "Net Cash Flow From Financing Activities",
            "order": 700,
            "unit": "USD",
            "value": 150600000
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800,
            "unit": "USD",
            "value": 150600000
          },
          "net_cash_flow_from_investing_activities": {
            "label": "Net Cash Flow From Investing Activities",
            "order": 400,
            "unit": "USD",
            "value": -41000000
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500,
            "unit": "USD",
            "value": -41000000
          },
          "net_cash_flow_from_operating_activities": {
            "label": "Net Cash Flow From Operating Activities",
            "order": 100,
            "unit": "USD",
            "value": -118300000
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200,
            "unit": "USD",
            "value": -118300000
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss": {
            "label": "Comprehensive Income/Loss",
            "order": 100,
            "unit": "USD",
            "value": 40500000
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200,
            "unit": "USD",
            "value": 0
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300,
            "unit": "USD",
            "value": 40500000
          },
          "other_comprehensive_income_loss": {
            "label": "Other Comprehensive Income/Loss",
            "order": 400,
            "unit": "USD",
            "value": 40500000
          },
          "other_comprehensive_income_loss_attributable_to_parent": {
            "label": "Other Comprehensive Income/Loss Attributable To Parent",
            "order": 600,
            "unit": "USD",
            "value": 8200000
          }
        },
        "income_statement": {
          "basic_earnings_per_share": {
            "label": "Basic Earnings Per Share",
            "order": 4200,
            "unit": "USD / shares",
            "value": 0.72
          },
          "benefits_costs_expenses": {
            "label": "Benefits Costs and Expenses",
            "order": 200,
            "unit": "USD",
            "value": 768400000
          },
          "cost_of_revenue": {
            "label": "Cost Of Revenue",
            "order": 300,
            "unit": "USD",
            "value": 536100000
          },
          "costs_and_expenses": {
            "label": "Costs And Expenses",
            "order": 600,
            "unit": "USD",
            "value": 768400000
          },
          "diluted_earnings_per_share": {
            "label": "Diluted Earnings Per Share",
            "order": 4300,
            "unit": "USD / shares",
            "value": 0.7
          },
          "gross_profit": {
            "label": "Gross Profit",
            "order": 800,
            "unit": "USD",
            "value": 269200000
          },
          "income_loss_from_continuing_operations_after_tax": {
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400,
            "unit": "USD",
            "value": 32300000
          },
          "income_loss_from_continuing_operations_before_tax": {
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500,
            "unit": "USD",
            "value": 36900000
          },
          "income_tax_expense_benefit": {
            "label": "Income Tax Expense/Benefit",
            "order": 2200,
            "unit": "USD",
            "value": 4600000
          },
          "interest_expense_operating": {
            "label": "Interest Expense, Operating",
            "order": 2700,
            "unit": "USD",
            "value": 4300000
          },
          "net_income_loss": {
            "label": "Net Income/Loss",
            "order": 3200,
            "unit": "USD",
            "value": 32300000
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300,
            "unit": "USD",
            "value": 0
          },
          "net_income_loss_attributable_to_parent": {
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500,
            "unit": "USD",
            "value": 32300000
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700,
            "unit": "USD",
            "value": 32300000
          },
          "operating_expenses": {
            "label": "Operating Expenses",
            "order": 1000,
            "unit": "USD",
            "value": 228000000
          },
          "operating_income_loss": {
            "label": "Operating Income/Loss",
            "order": 1100,
            "unit": "USD",
            "value": 41200000
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800,
            "unit": "USD",
            "value": 0
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900,
            "unit": "USD",
            "value": 0
          },
          "revenues": {
            "label": "Revenues",
            "order": 100,
            "unit": "USD",
            "value": 805300000
          }
        }
      },
      "fiscal_period": "Q1",
      "fiscal_year": "2022",
      "source_filing_file_url": "https://api.polygon.io/v1/reference/sec/filings/0001650729-22-000010/files/site-20220403_htm.xml",
      "source_filing_url": "https://api.polygon.io/v1/reference/sec/filings/0001650729-22-000010",
      "start_date": "2022-01-03"
    }
  ],
  "status": "OK"
}

{
  "results": [
    {
      "start_date": "2011-03-01",
      "end_date": "2011-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2011",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "balance_sheet": {
          "other_noncurrent_assets": {
            "value": 140988000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "assets": {
            "value": 1703727000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "fixed_assets": {
            "value": 324377000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "accounts_payable": {
            "value": 185096000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "noncurrent_liabilities": {
            "value": 452428000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "other_current_assets": {
            "value": 550586000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": -556000,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "inventory": {
            "value": 363399000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "current_liabilities": {
            "value": 416010000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "liabilities_and_equity": {
            "value": 1703727000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "noncurrent_assets": {
            "value": 465365000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "equity": {
            "value": 835289000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "equity_attributable_to_parent": {
            "value": 835845000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "liabilities": {
            "value": 868438000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "current_assets": {
            "value": 913985000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "other_current_liabilities": {
            "value": 230914000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          }
        },
        "income_statement": {
          "interest_expense_operating": {
            "value": 8063000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "basic_earnings_per_share": {
            "value": 0.5,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "income_loss_before_equity_method_investments": {
            "value": 31921000,
            "unit": "USD",
            "label": "Income/Loss Before Equity Method Investments",
            "order": 1300
          },
          "income_tax_expense_benefit": {
            "value": 8595000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "net_income_loss_attributable_to_parent": {
            "value": 21420000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 21420000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "net_income_loss": {
            "value": 21420000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "gross_profit": {
            "value": 370072000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "costs_and_expenses": {
            "value": 447184000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "operating_expenses": {
            "value": 337420000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "selling_general_and_administrative_expenses": {
            "value": 48956000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "other_operating_expenses": {
            "value": 288464000,
            "unit": "USD",
            "label": "Other Operating Expenses",
            "order": 1040
          },
          "income_loss_from_equity_method_investments": {
            "value": 731000,
            "unit": "USD",
            "label": "Income/Loss From Equity Method Investments",
            "order": 2100
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": -1278000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "income_tax_expense_benefit_deferred": {
            "value": 28304000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "operating_income_loss": {
            "value": 32652000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "revenues": {
            "value": 479836000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "cost_of_revenue_services": {
            "value": 109764000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 22698000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "diluted_earnings_per_share": {
            "value": 0.52,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "cost_of_revenue": {
            "value": 109764000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "cost_of_revenue_goods": {
            "value": 283109000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "benefits_costs_expenses": {
            "value": 447184000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 32652000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 48696000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities": {
            "value": -10774000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "exchange_gains_losses": {
            "value": 3000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_from_operating_activities": {
            "value": 48696000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow": {
            "value": 2717000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_continuing": {
            "value": 2714000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -10774000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -35208000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_investing_activities": {
            "value": -35208000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          }
        },
        "comprehensive_income": {
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss": {
            "value": 21420000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 21420000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          }
        }
      }
    },
    {
      "start_date": "2012-03-01",
      "end_date": "2012-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2012",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "cash_flow_statement": {
          "net_cash_flow_from_operating_activities": {
            "value": 75986000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -29112000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_financing_activities": {
            "value": -37049000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_continuing": {
            "value": 9277000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "exchange_gains_losses": {
            "value": -1399000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow": {
            "value": 7878000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_investing_activities": {
            "value": -29112000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -37049000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 75986000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          }
        },
        "comprehensive_income": {
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 12879000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss": {
            "value": 12879000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          }
        },
        "balance_sheet": {
          "liabilities_and_equity": {
            "value": 2195653000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "noncurrent_assets": {
            "value": 749448000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "equity": {
            "value": 866022000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "assets": {
            "value": 2195653000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "liabilities": {
            "value": 1329631000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "inventory": {
            "value": 461166000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "accounts_payable": {
            "value": 201405000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "current_liabilities": {
            "value": 473226000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "current_assets": {
            "value": 1063272000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "intangible_assets": {
            "value": 154962000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 1373000,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "fixed_assets": {
            "value": 382933000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "other_current_liabilities": {
            "value": 271821000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "noncurrent_liabilities": {
            "value": 856405000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "other_current_assets": {
            "value": 602106000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "equity_attributable_to_parent": {
            "value": 864649000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "other_noncurrent_assets": {
            "value": 211553000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          }
        },
        "income_statement": {
          "cost_of_revenue": {
            "value": 486011000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "costs_and_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 12879000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "income_loss_before_equity_method_investments": {
            "value": 25936000,
            "unit": "USD",
            "label": "Income/Loss Before Equity Method Investments",
            "order": 1300
          },
          "diluted_earnings_per_share": {
            "value": 0.31999999999999984,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "diluted_average_shares": {
            "value": -50000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "income_loss_from_equity_method_investments": {
            "value": 949000,
            "unit": "USD",
            "label": "Income/Loss From Equity Method Investments",
            "order": 2100
          },
          "benefits_costs_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "gross_profit": {
            "value": 77335000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "operating_income_loss": {
            "value": 26885000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "interest_expense_operating": {
            "value": 11882000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "income_tax_expense_benefit": {
            "value": 2659000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 563346000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "operating_expenses": {
            "value": 50450000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "basic_average_shares": {
            "value": 61000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "revenues": {
            "value": 563346000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "cost_of_revenue_goods": {
            "value": 327376000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 12879000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "income_tax_expense_benefit_deferred": {
            "value": 17241000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "basic_earnings_per_share": {
            "value": 0.31999999999999984,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "net_income_loss": {
            "value": 12879000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "selling_general_and_administrative_expenses": {
            "value": 50450000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "net_income_loss_attributable_to_parent": {
            "value": 12879000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "cost_of_revenue_services": {
            "value": 154935000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          }
        }
      }
    },
    {
      "start_date": "2013-03-01",
      "end_date": "2013-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2013",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "cash_flow_statement": {
          "net_cash_flow_from_investing_activities": {
            "value": -18900000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -18900000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "exchange_gains_losses": {
            "value": -100000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_from_financing_activities": {
            "value": -28200000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_continuing": {
            "value": 28000000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 75100000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -28200000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow": {
            "value": 27900000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_operating_activities": {
            "value": 75100000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          }
        },
        "balance_sheet": {
          "current_liabilities": {
            "value": 389000000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "noncurrent_liabilities": {
            "value": 828400000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "current_assets": {
            "value": 1033700000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "noncurrent_assets": {
            "value": 741500000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "accounts_payable": {
            "value": 149300000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "other_current_assets": {
            "value": 580000000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 900000,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "equity": {
            "value": 919500000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "other_current_liabilities": {
            "value": 239700000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "liabilities": {
            "value": 1217400000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "fixed_assets": {
            "value": 361700000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "other_noncurrent_assets": {
            "value": 222000000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "equity_attributable_to_parent": {
            "value": 918600000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "assets": {
            "value": 2136900000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "liabilities_and_equity": {
            "value": 2136900000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "intangible_assets": {
            "value": 157800000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "inventory": {
            "value": 453700000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 600000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss": {
            "value": 600000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          }
        },
        "income_statement": {
          "interest_expense_operating": {
            "value": 10000000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 600000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "income_loss_from_equity_method_investments": {
            "value": 1000000,
            "unit": "USD",
            "label": "Income/Loss From Equity Method Investments",
            "order": 2100
          },
          "benefits_costs_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "cost_of_revenue_services": {
            "value": 179800000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 600000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "diluted_earnings_per_share": {
            "value": 0.029999999999999805,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "basic_earnings_per_share": {
            "value": 0.009999999999999787,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "net_income_loss": {
            "value": 600000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 553800000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "income_loss_before_equity_method_investments": {
            "value": 6800000,
            "unit": "USD",
            "label": "Income/Loss Before Equity Method Investments",
            "order": 1300
          },
          "diluted_average_shares": {
            "value": -700000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "income_tax_expense_benefit": {
            "value": -1600000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "net_income_loss_attributable_to_parent": {
            "value": 600000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "operating_income_loss": {
            "value": 7800000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "gross_profit": {
            "value": 60300000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "cost_of_revenue_goods": {
            "value": 313700000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "costs_and_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "cost_of_revenue": {
            "value": 493500000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "revenues": {
            "value": 553800000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "income_tax_expense_benefit_deferred": {
            "value": 6500000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "basic_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "operating_expenses": {
            "value": 52500000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "selling_general_and_administrative_expenses": {
            "value": 52500000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          }
        }
      }
    },
    {
      "start_date": "2014-03-01",
      "end_date": "2014-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2014",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "cash_flow_statement": {
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 63100000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities": {
            "value": -83900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_continuing": {
            "value": -25200000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow": {
            "value": -25500000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_operating_activities": {
            "value": 63100000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow_from_investing_activities": {
            "value": -4400000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "exchange_gains_losses": {
            "value": -300000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -4400000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -83900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          }
        },
        "income_statement": {
          "selling_general_and_administrative_expenses": {
            "value": 53200000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "income_loss_from_equity_method_investments": {
            "value": 500000,
            "unit": "USD",
            "label": "Income/Loss From Equity Method Investments",
            "order": 2100
          },
          "cost_of_revenue_goods": {
            "value": 271600000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "diluted_average_shares": {
            "value": 0,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "cost_of_revenue": {
            "value": 419600000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 17100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "operating_expenses": {
            "value": 53200000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 17100000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "net_income_loss_attributable_to_parent": {
            "value": 17100000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "costs_and_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "basic_earnings_per_share": {
            "value": 0.44000000000000017,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "income_tax_expense_benefit_deferred": {
            "value": 4900000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "diluted_earnings_per_share": {
            "value": 0.43000000000000016,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "operating_income_loss": {
            "value": 32600000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 505400000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "net_income_loss": {
            "value": 17100000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "income_tax_expense_benefit": {
            "value": 6800000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "basic_average_shares": {
            "value": 0,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "income_loss_before_equity_method_investments": {
            "value": 32100000,
            "unit": "USD",
            "label": "Income/Loss Before Equity Method Investments",
            "order": 1300
          },
          "gross_profit": {
            "value": 85800000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "benefits_costs_expenses": {
            "value": 0,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "revenues": {
            "value": 505400000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "interest_expense_operating": {
            "value": 9800000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "cost_of_revenue_services": {
            "value": 148000000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          }
        },
        "balance_sheet": {
          "noncurrent_liabilities": {
            "value": 796700000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "current_liabilities": {
            "value": 402100000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "equity": {
            "value": 1000700000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "liabilities": {
            "value": 1198800000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "intangible_assets": {
            "value": 165400000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "other_current_assets": {
            "value": 621600000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "current_assets": {
            "value": 1116900000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "equity_attributable_to_parent": {
            "value": 999500000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "other_noncurrent_assets": {
            "value": 287400000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "accounts_payable": {
            "value": 171100000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "inventory": {
            "value": 495300000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "fixed_assets": {
            "value": 314900000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "liabilities_and_equity": {
            "value": 2199500000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "assets": {
            "value": 2199500000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "other_current_liabilities": {
            "value": 231000000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "noncurrent_assets": {
            "value": 767700000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 1200000,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 17100000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss": {
            "value": 17100000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          }
        }
      }
    },
    {
      "start_date": "2015-03-01",
      "end_date": "2015-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2015",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "comprehensive_income": {
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": -82099902.8,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss": {
            "value": -82099902.8,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          }
        },
        "balance_sheet": {
          "current_assets": {
            "value": 954100000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "inventory": {
            "value": 456000000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "other_current_liabilities": {
            "value": 269700000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "liabilities": {
            "value": 669900000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "accounts_payable": {
            "value": 142300000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "fixed_assets": {
            "value": 214800000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "intangible_assets": {
            "value": 36700000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "other_noncurrent_assets": {
            "value": 309400000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "current_liabilities": {
            "value": 412000000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "equity": {
            "value": 845100000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "equity_attributable_to_parent": {
            "value": 845100000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "noncurrent_liabilities": {
            "value": 257900000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "noncurrent_assets": {
            "value": 560900000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "other_current_assets": {
            "value": 498100000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "liabilities_and_equity": {
            "value": 1515000000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "assets": {
            "value": 1515000000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_continuing": {
            "value": -13700000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_financing_activities": {
            "value": -674800000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": 713100000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow": {
            "value": -12300000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "exchange_gains_losses": {
            "value": 1400000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": -52000000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -674800000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_operating_activities": {
            "value": -52000000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow_from_investing_activities": {
            "value": 713100000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          }
        },
        "income_statement": {
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": 97.2,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "cost_of_revenue_goods": {
            "value": 267900000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "cost_of_revenue_services": {
            "value": 168300000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 15100000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": -82100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "basic_earnings_per_share": {
            "value": 0.38,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "diluted_earnings_per_share": {
            "value": 0.36,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "net_income_loss": {
            "value": -82099902.8,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "income_tax_expense_benefit": {
            "value": -42900000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "basic_average_shares": {
            "value": 400000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "selling_general_and_administrative_expenses": {
            "value": 51100000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": -97199902.8,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "diluted_average_shares": {
            "value": 200000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": -82100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "operating_income_loss": {
            "value": -82100000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "net_income_loss_attributable_to_parent": {
            "value": 15100000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "cost_of_revenue": {
            "value": 436200000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "income_tax_expense_benefit_deferred": {
            "value": -44900000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "operating_expenses": {
            "value": 61700000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "costs_and_expenses": {
            "value": 497900000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "gross_profit": {
            "value": -20400000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "interest_expense_operating": {
            "value": 7100000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "revenues": {
            "value": 415800000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "benefits_costs_expenses": {
            "value": 497900000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "income_loss_from_equity_method_investments": {
            "value": -1400000,
            "unit": "USD",
            "label": "Income/Loss From Equity Method Investments",
            "order": 2100
          },
          "income_loss_before_equity_method_investments": {
            "value": -70100000,
            "unit": "USD",
            "label": "Income/Loss Before Equity Method Investments",
            "order": 1300
          }
        }
      }
    },
    {
      "start_date": "2016-03-01",
      "end_date": "2016-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2016",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "cash_flow_statement": {
          "net_cash_flow_from_investing_activities": {
            "value": -10900000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -54400000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -14200000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_financing_activities": {
            "value": -54400000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "exchange_gains_losses": {
            "value": 100000,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_discontinued": {
            "value": 4800000,
            "unit": "USD",
            "label": "Net Cash Flow, Discontinued",
            "order": 1300
          },
          "net_cash_flow_from_operating_activities_discontinued": {
            "value": 1500000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Discontinued",
            "order": 300
          },
          "net_cash_flow_from_investing_activities_discontinued": {
            "value": 3300000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Discontinued",
            "order": 600
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 44500000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow": {
            "value": -19200000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_continuing": {
            "value": -24100000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_operating_activities": {
            "value": 46000000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          }
        },
        "balance_sheet": {
          "equity": {
            "value": 865800000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "other_noncurrent_assets": {
            "value": 300400000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "current_liabilities": {
            "value": 329000000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "inventory": {
            "value": 445400000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "liabilities_and_equity": {
            "value": 1442100000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "liabilities": {
            "value": 576300000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_assets": {
            "value": 569000000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "accounts_payable": {
            "value": 163400000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "current_assets": {
            "value": 873100000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "other_current_liabilities": {
            "value": 165600000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "noncurrent_liabilities": {
            "value": 247300000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "intangible_assets": {
            "value": 35800000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "assets": {
            "value": 1442100000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "fixed_assets": {
            "value": 232800000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "equity_attributable_to_parent": {
            "value": 865800000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "other_current_assets": {
            "value": 427700000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          }
        },
        "income_statement": {
          "interest_expense_operating": {
            "value": 1200000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "basic_earnings_per_share": {
            "value": 0.35,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 11200000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "net_income_loss_attributable_to_parent": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "operating_expenses": {
            "value": 53000000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "cost_of_revenue": {
            "value": 394000000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "operating_income_loss": {
            "value": 11200000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "cost_of_revenue_goods": {
            "value": 203400000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "costs_and_expenses": {
            "value": 447000000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "income_tax_expense_benefit_deferred": {
            "value": -2700000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "gross_profit": {
            "value": 64200000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "cost_of_revenue_services": {
            "value": 190600000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": 800000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "diluted_earnings_per_share": {
            "value": 0.34,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "benefits_costs_expenses": {
            "value": 447000000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "income_tax_expense_benefit": {
            "value": 5700000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "basic_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 11200000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "revenues": {
            "value": 458200000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "selling_general_and_administrative_expenses": {
            "value": 46300000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "net_income_loss": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "diluted_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 12000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss": {
            "value": 12000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          }
        }
      }
    },
    {
      "start_date": "2017-03-01",
      "end_date": "2017-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2017",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "income_statement": {
          "costs_and_expenses": {
            "value": 477200000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "selling_general_and_administrative_expenses": {
            "value": 58200000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "basic_average_shares": {
            "value": 0,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "diluted_average_shares": {
            "value": 0,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "cost_of_revenue_goods": {
            "value": 220400000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "basic_earnings_per_share": {
            "value": 0.62,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "operating_expenses": {
            "value": 64700000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "diluted_earnings_per_share": {
            "value": 0.62,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "income_tax_expense_benefit": {
            "value": 5000000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "net_income_loss": {
            "value": 21200000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "net_income_loss_attributable_to_parent": {
            "value": 21200000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "interest_expense_operating": {
            "value": 1500000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 15100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "cost_of_revenue_services": {
            "value": 192100000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "income_tax_expense_benefit_deferred": {
            "value": 2300000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "gross_profit": {
            "value": 79800000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 15100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "cost_of_revenue": {
            "value": 412500000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 21200000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "revenues": {
            "value": 492300000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "operating_income_loss": {
            "value": 15100000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "benefits_costs_expenses": {
            "value": 477200000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": 6100000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          }
        },
        "balance_sheet": {
          "other_noncurrent_assets": {
            "value": 380900000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "liabilities": {
            "value": 589900000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_liabilities": {
            "value": 254800000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "liabilities_and_equity": {
            "value": 1504100000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "intangible_assets": {
            "value": 32800000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "other_current_liabilities": {
            "value": 157700000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "current_assets": {
            "value": 888500000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "fixed_assets": {
            "value": 201900000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "noncurrent_assets": {
            "value": 615600000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "assets": {
            "value": 1504100000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "equity": {
            "value": 914200000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "equity_attributable_to_parent": {
            "value": 914200000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "accounts_payable": {
            "value": 177400000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "inventory": {
            "value": 483100000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "other_current_assets": {
            "value": 405400000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "current_liabilities": {
            "value": 335100000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -17300000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -15500000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_continuing": {
            "value": 1000000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_discontinued": {
            "value": -800000,
            "unit": "USD",
            "label": "Net Cash Flow, Discontinued",
            "order": 1300
          },
          "net_cash_flow_from_operating_activities_discontinued": {
            "value": -800000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Discontinued",
            "order": 300
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 33800000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_operating_activities": {
            "value": 33000000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "exchange_gains_losses": {
            "value": 0,
            "unit": "USD",
            "label": "Exchange Gains/Losses",
            "order": 1000
          },
          "net_cash_flow_from_financing_activities": {
            "value": -15500000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow": {
            "value": 200000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_investing_activities": {
            "value": -17300000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 21200000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss": {
            "value": 21200000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          }
        }
      }
    },
    {
      "start_date": "2018-03-01",
      "end_date": "2018-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2018",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "income_statement": {
          "cost_of_revenue_services": {
            "value": 168600000,
            "unit": "USD",
            "label": "Cost Of Revenue, Services",
            "order": 500
          },
          "diluted_average_shares": {
            "value": 100000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "gross_profit": {
            "value": 84700000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "income_tax_expense_benefit_deferred": {
            "value": 11200000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "benefits_costs_expenses": {
            "value": 455400000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "basic_average_shares": {
            "value": 100000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "cost_of_revenue_goods": {
            "value": 220200000,
            "unit": "USD",
            "label": "Cost Of Revenue, Goods",
            "order": 400
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": -6100000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "costs_and_expenses": {
            "value": 455400000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 18100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "net_income_loss_attributable_to_parent": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "basic_earnings_per_share": {
            "value": 0.35,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "operating_expenses": {
            "value": 66600000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "revenues": {
            "value": 473500000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "selling_general_and_administrative_expenses": {
            "value": 61900000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "income_tax_expense_benefit": {
            "value": 2100000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "cost_of_revenue": {
            "value": 388800000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "net_income_loss": {
            "value": 12000000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "operating_income_loss": {
            "value": 18100000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "interest_expense_operating": {
            "value": 2200000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 18100000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "diluted_earnings_per_share": {
            "value": 0.34,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          }
        },
        "balance_sheet": {
          "equity_attributable_to_parent": {
            "value": 936300000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "other_noncurrent_assets": {
            "value": 421000000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "inventory": {
            "value": 460700000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "liabilities_and_equity": {
            "value": 1524700000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "assets": {
            "value": 1524700000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "current_assets": {
            "value": 942700000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "liabilities": {
            "value": 588400000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_assets": {
            "value": 582000000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "other_current_liabilities": {
            "value": 163300000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "other_current_assets": {
            "value": 482000000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "fixed_assets": {
            "value": 133200000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "equity": {
            "value": 936300000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "intangible_assets": {
            "value": 27800000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "noncurrent_liabilities": {
            "value": 255100000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "current_liabilities": {
            "value": 333300000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "accounts_payable": {
            "value": 170000000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_from_operating_activities_discontinued": {
            "value": -8800000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Discontinued",
            "order": 300
          },
          "net_cash_flow_from_financing_activities_discontinued": {
            "value": -400000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Discontinued",
            "order": 900
          },
          "net_cash_flow_continuing": {
            "value": 15900000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_operating_activities": {
            "value": 31400000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 40200000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -18000000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -6300000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_investing_activities": {
            "value": -5900000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_from_investing_activities_discontinued": {
            "value": 400000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Discontinued",
            "order": 600
          },
          "net_cash_flow": {
            "value": 7100000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_discontinued": {
            "value": -8800000,
            "unit": "USD",
            "label": "Net Cash Flow, Discontinued",
            "order": 1300
          },
          "net_cash_flow_from_financing_activities": {
            "value": -18400000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 12000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "comprehensive_income_loss": {
            "value": 12000000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          }
        }
      }
    },
    {
      "start_date": "2019-03-01",
      "end_date": "2019-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2019",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "balance_sheet": {
          "intangible_assets": {
            "value": 22200000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "accounts_payable": {
            "value": 187800000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "other_noncurrent_assets": {
            "value": 409700000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "current_liabilities": {
            "value": 357500000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "noncurrent_liabilities": {
            "value": 253800000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "fixed_assets": {
            "value": 132800000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "equity_attributable_to_parent": {
            "value": 905900000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "liabilities_and_equity": {
            "value": 1517200000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "noncurrent_assets": {
            "value": 564700000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "assets": {
            "value": 1517200000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "liabilities": {
            "value": 611300000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "current_assets": {
            "value": 952500000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "inventory": {
            "value": 523700000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          },
          "equity": {
            "value": 905900000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "other_current_liabilities": {
            "value": 169700000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "other_current_assets": {
            "value": 428800000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss": {
            "value": 22800000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": 22800000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_from_operating_activities": {
            "value": 42900000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow": {
            "value": -9200000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_financing_activities_discontinued": {
            "value": 0,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Discontinued",
            "order": 900
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": 44100000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_financing_activities": {
            "value": -46900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_from_investing_activities": {
            "value": -5200000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_continuing": {
            "value": -8000000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_discontinued": {
            "value": -1200000,
            "unit": "USD",
            "label": "Net Cash Flow, Discontinued",
            "order": 1300
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -5200000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_investing_activities_discontinued": {
            "value": 0,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Discontinued",
            "order": 600
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": -46900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          },
          "net_cash_flow_from_operating_activities_discontinued": {
            "value": -1200000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Discontinued",
            "order": 300
          }
        },
        "income_statement": {
          "net_income_loss_attributable_to_parent": {
            "value": 22800000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "operating_income_loss": {
            "value": 26600000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "income_tax_expense_benefit_deferred": {
            "value": 5200000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "basic_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "revenues": {
            "value": 562700000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "diluted_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": 26600000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "income_tax_expense_benefit": {
            "value": 200000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": 26600000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "cost_of_revenue": {
            "value": 468000000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": 22800000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "gross_profit": {
            "value": 94700000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "basic_earnings_per_share": {
            "value": 0.66,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "selling_general_and_administrative_expenses": {
            "value": 63300000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "diluted_earnings_per_share": {
            "value": 0.65,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "interest_expense_operating": {
            "value": 2300000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "costs_and_expenses": {
            "value": 536100000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": -3800000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "other_operating_expenses": {
            "value": 2100000,
            "unit": "USD",
            "label": "Other Operating Expenses",
            "order": 1040
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          },
          "benefits_costs_expenses": {
            "value": 536100000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "net_income_loss": {
            "value": 22800000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "operating_expenses": {
            "value": 536100000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          }
        }
      }
    },
    {
      "start_date": "2020-03-01",
      "end_date": "2020-05-31",
      "timeframe": "quarterly",
      "fiscal_period": "Q4",
      "fiscal_year": "2020",
      "cik": "0000001750",
      "sic": "3720",
      "tickers": [
        "AIR"
      ],
      "company_name": "AAR CORP",
      "financials": {
        "income_statement": {
          "other_operating_expenses": {
            "value": 2100000,
            "unit": "USD",
            "label": "Other Operating Expenses",
            "order": 1040
          },
          "benefits_costs_expenses": {
            "value": 431500000,
            "unit": "USD",
            "label": "Benefits Costs and Expenses",
            "order": 200
          },
          "income_loss_from_discontinued_operations_net_of_tax": {
            "value": -1500000,
            "unit": "USD",
            "label": "Income/Loss From Discontinued Operations Net Of Tax",
            "order": 1600
          },
          "cost_of_revenue": {
            "value": 380100000,
            "unit": "USD",
            "label": "Cost Of Revenue",
            "order": 300
          },
          "basic_earnings_per_share": {
            "value": -0.47,
            "unit": "USD / shares",
            "label": "Basic Earnings Per Share",
            "order": 4200
          },
          "gross_profit": {
            "value": 36400000,
            "unit": "USD",
            "label": "Gross Profit",
            "order": 800
          },
          "net_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Noncontrolling Interest",
            "order": 3300
          },
          "revenues": {
            "value": 416500000,
            "unit": "USD",
            "label": "Revenues",
            "order": 100
          },
          "operating_income_loss": {
            "value": -15000000,
            "unit": "USD",
            "label": "Operating Income/Loss",
            "order": 1100
          },
          "diluted_average_shares": {
            "value": -100000,
            "unit": "shares",
            "label": "Diluted Average Shares",
            "order": 4500
          },
          "income_tax_expense_benefit_deferred": {
            "value": -1000000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit, Deferred",
            "order": 2400
          },
          "interest_expense_operating": {
            "value": 2800000,
            "unit": "USD",
            "label": "Interest Expense, Operating",
            "order": 2700
          },
          "preferred_stock_dividends_and_other_adjustments": {
            "value": 0,
            "unit": "USD",
            "label": "Preferred Stock Dividends And Other Adjustments",
            "order": 3900
          },
          "net_income_loss_available_to_common_stockholders_basic": {
            "value": -16500000,
            "unit": "USD",
            "label": "Net Income/Loss Available To Common Stockholders, Basic",
            "order": 3700
          },
          "income_loss_from_continuing_operations_before_tax": {
            "value": -15000000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations Before Tax",
            "order": 1500
          },
          "income_loss_from_continuing_operations_after_tax": {
            "value": -15000000,
            "unit": "USD",
            "label": "Income/Loss From Continuing Operations After Tax",
            "order": 1400
          },
          "basic_average_shares": {
            "value": 0,
            "unit": "shares",
            "label": "Basic Average Shares",
            "order": 4400
          },
          "net_income_loss_attributable_to_parent": {
            "value": -16500000,
            "unit": "USD",
            "label": "Net Income/Loss Attributable To Parent",
            "order": 3500
          },
          "costs_and_expenses": {
            "value": 431500000,
            "unit": "USD",
            "label": "Costs And Expenses",
            "order": 600
          },
          "net_income_loss": {
            "value": -16500000,
            "unit": "USD",
            "label": "Net Income/Loss",
            "order": 3200
          },
          "selling_general_and_administrative_expenses": {
            "value": 47300000,
            "unit": "USD",
            "label": "Selling, General, and Administrative Expenses",
            "order": 1010
          },
          "diluted_earnings_per_share": {
            "value": -0.47,
            "unit": "USD / shares",
            "label": "Diluted Earnings Per Share",
            "order": 4300
          },
          "income_tax_expense_benefit": {
            "value": -4000000,
            "unit": "USD",
            "label": "Income Tax Expense/Benefit",
            "order": 2200
          },
          "operating_expenses": {
            "value": 431500000,
            "unit": "USD",
            "label": "Operating Expenses",
            "order": 1000
          },
          "participating_securities_distributed_and_undistributed_earnings_loss_basic": {
            "value": 0,
            "unit": "USD",
            "label": "Participating Securities, Distributed And Undistributed Earnings/Loss, Basic",
            "order": 3800
          }
        },
        "comprehensive_income": {
          "comprehensive_income_loss_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Noncontrolling Interest",
            "order": 200
          },
          "comprehensive_income_loss": {
            "value": -16500000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss",
            "order": 100
          },
          "other_comprehensive_income_loss": {
            "value": 0,
            "unit": "USD",
            "label": "Other Comprehensive Income/Loss",
            "order": 400
          },
          "comprehensive_income_loss_attributable_to_parent": {
            "value": -16500000,
            "unit": "USD",
            "label": "Comprehensive Income/Loss Attributable To Parent",
            "order": 300
          }
        },
        "balance_sheet": {
          "accounts_receivable": {
            "value": 171900000,
            "unit": "USD",
            "label": "Accounts Receivable",
            "order": 220
          },
          "current_liabilities": {
            "value": 383100000,
            "unit": "USD",
            "label": "Current Liabilities",
            "order": 700
          },
          "noncurrent_liabilities": {
            "value": 793300000,
            "unit": "USD",
            "label": "Noncurrent Liabilities",
            "order": 800
          },
          "intangible_assets": {
            "value": 6000000,
            "unit": "USD",
            "label": "Intangible Assets",
            "order": 330
          },
          "other_current_liabilities": {
            "value": 191500000,
            "unit": "USD",
            "label": "Other Current Liabilities",
            "order": 740
          },
          "current_assets": {
            "value": 1438700000,
            "unit": "USD",
            "label": "Current Assets",
            "order": 200
          },
          "other_noncurrent_assets": {
            "value": 498600000,
            "unit": "USD",
            "label": "Other Non-current Assets",
            "order": 350
          },
          "liabilities": {
            "value": 1176400000,
            "unit": "USD",
            "label": "Liabilities",
            "order": 600
          },
          "noncurrent_assets": {
            "value": 640300000,
            "unit": "USD",
            "label": "Noncurrent Assets",
            "order": 300
          },
          "assets": {
            "value": 2079000000,
            "unit": "USD",
            "label": "Assets",
            "order": 100
          },
          "equity": {
            "value": 902600000,
            "unit": "USD",
            "label": "Equity",
            "order": 1400
          },
          "other_current_assets": {
            "value": 643700000,
            "unit": "USD",
            "label": "Other Current Assets",
            "order": 250
          },
          "fixed_assets": {
            "value": 135700000,
            "unit": "USD",
            "label": "Fixed Assets",
            "order": 320
          },
          "equity_attributable_to_parent": {
            "value": 902600000,
            "unit": "USD",
            "label": "Equity Attributable To Parent",
            "order": 1600
          },
          "accounts_payable": {
            "value": 191600000,
            "unit": "USD",
            "label": "Accounts Payable",
            "order": 710
          },
          "liabilities_and_equity": {
            "value": 2079000000,
            "unit": "USD",
            "label": "Liabilities And Equity",
            "order": 1900
          },
          "equity_attributable_to_noncontrolling_interest": {
            "value": 0,
            "unit": "USD",
            "label": "Equity Attributable To Noncontrolling Interest",
            "order": 1500
          },
          "inventory": {
            "value": 623100000,
            "unit": "USD",
            "label": "Inventory",
            "order": 230
          }
        },
        "cash_flow_statement": {
          "net_cash_flow_from_investing_activities": {
            "value": -4800000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities",
            "order": 400
          },
          "net_cash_flow_discontinued": {
            "value": -8600000,
            "unit": "USD",
            "label": "Net Cash Flow, Discontinued",
            "order": 1300
          },
          "net_cash_flow_from_operating_activities": {
            "value": -27200000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities",
            "order": 100
          },
          "net_cash_flow_from_operating_activities_discontinued": {
            "value": -8600000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Discontinued",
            "order": 300
          },
          "net_cash_flow": {
            "value": 359900000,
            "unit": "USD",
            "label": "Net Cash Flow",
            "order": 1100
          },
          "net_cash_flow_from_financing_activities": {
            "value": 391900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities",
            "order": 700
          },
          "net_cash_flow_continuing": {
            "value": 368500000,
            "unit": "USD",
            "label": "Net Cash Flow, Continuing",
            "order": 1200
          },
          "net_cash_flow_from_operating_activities_continuing": {
            "value": -18600000,
            "unit": "USD",
            "label": "Net Cash Flow From Operating Activities, Continuing",
            "order": 200
          },
          "net_cash_flow_from_investing_activities_continuing": {
            "value": -4800000,
            "unit": "USD",
            "label": "Net Cash Flow From Investing Activities, Continuing",
            "order": 500
          },
          "net_cash_flow_from_financing_activities_continuing": {
            "value": 391900000,
            "unit": "USD",
            "label": "Net Cash Flow From Financing Activities, Continuing",
            "order": 800
          }
        }
      }
    }
  ],
  "status": "OK",
  "request_id": "42041928752c28ee6472197a4d5aaba4",
  "next_url": "https://api.polygon.io/vX/reference/financials?cursor=YXA9MDAwMDAwMTc1MCUzQTIwMjAlM0FRNCZhcz0mZmlsaW5nX2RhdGUuZ3RlPTE5NzAtMDEtMDEmbGltaXQ9MTAmb3JkZXI9YXNjJnNvcnQ9ZmlsaW5nX2RhdGU"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Fundamentals/
Short Interest
Short Interest
GET
/stocks/v1/short-interest
Retrieve bi-monthly aggregated short interest data reported to FINRA by broker-dealers for a specified stock ticker. Short interest represents the total number of shares sold short but not yet covered or closed out, serving as an indicator of market sentiment and potential price movements. High short interest can signal bearish sentiment or highlight opportunities such as potential short squeezes. This endpoint provides essential insights for investors monitoring market positioning and sentiment.

Use Cases: Market sentiment analysis, short-squeeze prediction, risk management, trading strategy refinement.

Query Parameters
Reset values
ticker
string
The primary ticker symbol for the stock.

Show filter modifiers
days_to_cover
number
Calculated as short_interest divided by avg_daily_volume, representing the estimated number of days it would take to cover all short positions based on average trading volume. Value must be a floating point number.

Show filter modifiers
settlement_date
string
The date (formatted as YYYY-MM-DD) on which the short interest data is considered settled, typically based on exchange reporting schedules.

Show filter modifiers
avg_daily_volume
integer
The average daily trading volume for the stock over a specified period, typically used to contextualize short interest. Value must be an integer.

Show filter modifiers
limit
integer
10
Limit the maximum number of results returned. Defaults to '10' if not specified. The maximum allowed limit is '50000'.
sort
string
ticker.asc
A comma separated list of sort columns. For each column, append '.asc' or '.desc' to specify the sort direction. The sort column defaults to 'ticker' if not specified. The sort order defaults to 'asc' if not specified.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page.
request_id
string
A request id assigned by the server.
results
array (object)
The results for this request.

Hide child attributes
avg_daily_volume
integer
The average daily trading volume for the stock over a specified period, typically used to contextualize short interest.
days_to_cover
number
Calculated as short_interest divided by avg_daily_volume, representing the estimated number of days it would take to cover all short positions based on average trading volume.
settlement_date
string
The date (formatted as YYYY-MM-DD) on which the short interest data is considered settled, typically based on exchange reporting schedules.
short_interest
integer
optional
The total number of shares that have been sold short but have not yet been covered or closed out.
ticker
string
optional
The primary ticker symbol for the stock.
status
enum (OK)
The status of this request's response.
Code Examples

Shell

Python

Go


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

items = []
for item in client.list_short_interest(
	limit=10,
	sort="ticker.asc",
	):
    items.append(item)

print(items)
Query URL
GET
https://api.polygon.io/stocks/v1/short-interest?limit=10&sort=ticker.asc&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "request_id": 1,
  "results": [
    {
      "avg_daily_volume": 2340158,
      "days_to_cover": 1.67,
      "settlement_date": "2025-03-14",
      "short_interest": 3906231,
      "ticker": "A"
    }
  ],
  "status": "OK"
}
Financials
Short Volume
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Short Interest | Stocks REST API - Polygon

{
  "status": "OK",
  "request_id": "e457edebe4b24fd1b9c9054608745f1f",
  "results": [
    {
      "settlement_date": "2025-06-13",
      "ticker": "A",
      "short_interest": 4110706,
      "avg_daily_volume": 2078685,
      "days_to_cover": 1.98
    },
    {
      "settlement_date": "2025-05-30",
      "ticker": "A",
      "short_interest": 4136120,
      "avg_daily_volume": 2650294,
      "days_to_cover": 1.56
    },
    {
      "settlement_date": "2025-05-15",
      "ticker": "A",
      "short_interest": 4379116,
      "avg_daily_volume": 1985940,
      "days_to_cover": 2.21
    },
    {
      "settlement_date": "2025-04-30",
      "ticker": "A",
      "short_interest": 4322980,
      "avg_daily_volume": 1755803,
      "days_to_cover": 2.46
    },
    {
      "settlement_date": "2025-04-15",
      "ticker": "A",
      "short_interest": 3699608,
      "avg_daily_volume": 3205731,
      "days_to_cover": 1.15
    },
    {
      "settlement_date": "2025-03-31",
      "ticker": "A",
      "short_interest": 3613843,
      "avg_daily_volume": 1952537,
      "days_to_cover": 1.85
    },
    {
      "settlement_date": "2025-03-14",
      "ticker": "A",
      "short_interest": 3906231,
      "avg_daily_volume": 2340158,
      "days_to_cover": 1.67
    },
    {
      "settlement_date": "2025-02-28",
      "ticker": "A",
      "short_interest": 3424858,
      "avg_daily_volume": 2038947,
      "days_to_cover": 1.68
    },
    {
      "settlement_date": "2025-02-14",
      "ticker": "A",
      "short_interest": 2965089,
      "avg_daily_volume": 1473444,
      "days_to_cover": 2.01
    },
    {
      "settlement_date": "2025-01-31",
      "ticker": "A",
      "short_interest": 3249651,
      "avg_daily_volume": 1956969,
      "days_to_cover": 1.66
    }
  ],
  "next_url": "https://api.polygon.io/stocks/v1/short-interest?cursor=AAEBAQEKAAEBDQFB"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
Fundamentals/
Short Volume
Short Volume
GET
/stocks/v1/short-volume
Retrieve daily aggregated short sale volume data reported to FINRA from off-exchange trading venues and alternative trading systems (ATS) for a specified stock ticker. Unlike short interest, which measures outstanding short positions at specific reporting intervals, short volume captures the daily trading activity of short sales. Monitoring short volume helps users detect immediate market sentiment shifts, analyze trading behavior, and identify trends in short-selling activity that may signal upcoming price movements.

Use Cases: Intraday sentiment analysis, short-sale trend identification, liquidity analysis, trading strategy optimization.

Query Parameters
Reset values
ticker
string
The primary ticker symbol for the stock.

Show filter modifiers
date
string
The date of trade activity reported in the format YYYY-MM-DD

Show filter modifiers
short_volume_ratio
number
The percentage of total volume that was sold short. Calculated as (short_volume / total_volume) * 100. Value must be a floating point number.

Show filter modifiers
total_volume
integer
Total reported volume across all venues for the ticker on the given date. Value must be an integer.

Show filter modifiers
limit
integer
10
Limit the maximum number of results returned. Defaults to '10' if not specified. The maximum allowed limit is '50000'.
sort
string
ticker.asc
A comma separated list of sort columns. For each column, append '.asc' or '.desc' to specify the sort direction. The sort column defaults to 'ticker' if not specified. The sort order defaults to 'asc' if not specified.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page.
request_id
string
A request id assigned by the server.
results
array (object)
The results for this request.

Hide child attributes
adf_short_volume
integer
optional
Short volume reported via the Alternative Display Facility (ADF), excluding exempt volume.
adf_short_volume_exempt
integer
optional
Short volume reported via ADF that was marked as exempt.
date
string
The date of trade activity reported in the format YYYY-MM-DD
exempt_volume
integer
optional
Portion of short volume that was marked as exempt from regulation SHO.
nasdaq_carteret_short_volume
integer
optional
Short volume reported from Nasdaq's Carteret facility, excluding exempt volume.
nasdaq_carteret_short_volume_exempt
integer
optional
Short volume from Nasdaq Carteret that was marked as exempt.
nasdaq_chicago_short_volume
integer
optional
Short volume reported from Nasdaq's Chicago facility, excluding exempt volume.
nasdaq_chicago_short_volume_exempt
integer
optional
Short volume from Nasdaq Chicago that was marked as exempt.
non_exempt_volume
integer
optional
Portion of short volume that was not exempt from regulation SHO (i.e., short_volume - exempt_volume).
nyse_short_volume
integer
optional
Short volume reported from NYSE facilities, excluding exempt volume.
nyse_short_volume_exempt
integer
optional
Short volume from NYSE facilities that was marked as exempt.
short_volume
integer
optional
Total number of shares sold short across all venues for the ticker on the given date.
short_volume_ratio
number
optional
The percentage of total volume that was sold short. Calculated as (short_volume / total_volume) * 100.
ticker
string
optional
The primary ticker symbol for the stock.
total_volume
integer
optional
Total reported volume across all venues for the ticker on the given date.
status
enum (OK)
The status of this request's response.
Code Examples

Shell

Python

Go


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

items = []
for item in client.list_short_volume(
	limit=10,
	sort="ticker.asc",
	):
    items.append(item)

print(items)
Query URL
GET
https://api.polygon.io/stocks/v1/short-volume?limit=10&sort=ticker.asc&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "request_id": 1,
  "results": [
    {
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0,
      "date": "2025-03-25",
      "exempt_volume": 1,
      "nasdaq_carteret_short_volume": 179943,
      "nasdaq_carteret_short_volume_exempt": 1,
      "nasdaq_chicago_short_volume": 1,
      "nasdaq_chicago_short_volume_exempt": 0,
      "non_exempt_volume": 181218,
      "nyse_short_volume": 1275,
      "nyse_short_volume_exempt": 0,
      "short_volume": 181219,
      "short_volume_ratio": 31.57,
      "ticker": "A",
      "total_volume": 574084
    }
  ],
  "status": "OK"
}
Short Interest
News
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Short Volume | Stocks REST API - Polygon

{
  "status": "OK",
  "request_id": "924bfd435446454a816f89395b13198d",
  "results": [
    {
      "ticker": "A",
      "date": "2025-06-27",
      "total_volume": 380626,
      "short_volume": 230029,
      "exempt_volume": 0,
      "non_exempt_volume": 230029,
      "short_volume_ratio": 60.43,
      "nyse_short_volume": 5106,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 224877,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 46,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-26",
      "total_volume": 552859,
      "short_volume": 373471,
      "exempt_volume": 0,
      "non_exempt_volume": 373471,
      "short_volume_ratio": 67.55,
      "nyse_short_volume": 10647,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 362800,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 24,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-25",
      "total_volume": 417231,
      "short_volume": 260335,
      "exempt_volume": 0,
      "non_exempt_volume": 260335,
      "short_volume_ratio": 62.4,
      "nyse_short_volume": 8560,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 251745,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 30,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-24",
      "total_volume": 518076,
      "short_volume": 308648,
      "exempt_volume": 375,
      "non_exempt_volume": 308273,
      "short_volume_ratio": 59.58,
      "nyse_short_volume": 21385,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 287126,
      "nasdaq_carteret_short_volume_exempt": 375,
      "nasdaq_chicago_short_volume": 137,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-23",
      "total_volume": 422108,
      "short_volume": 249016,
      "exempt_volume": 136,
      "non_exempt_volume": 248880,
      "short_volume_ratio": 58.99,
      "nyse_short_volume": 5122,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 243885,
      "nasdaq_carteret_short_volume_exempt": 136,
      "nasdaq_chicago_short_volume": 9,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-20",
      "total_volume": 400950,
      "short_volume": 259024,
      "exempt_volume": 0,
      "non_exempt_volume": 259024,
      "short_volume_ratio": 64.6,
      "nyse_short_volume": 9195,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 249819,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 10,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-18",
      "total_volume": 459118,
      "short_volume": 304960,
      "exempt_volume": 0,
      "non_exempt_volume": 304960,
      "short_volume_ratio": 66.42,
      "nyse_short_volume": 6450,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 298498,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 12,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-17",
      "total_volume": 579982,
      "short_volume": 382967,
      "exempt_volume": 92,
      "non_exempt_volume": 382875,
      "short_volume_ratio": 66.03,
      "nyse_short_volume": 7708,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 375198,
      "nasdaq_carteret_short_volume_exempt": 92,
      "nasdaq_chicago_short_volume": 61,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-16",
      "total_volume": 486421,
      "short_volume": 329978,
      "exempt_volume": 0,
      "non_exempt_volume": 329978,
      "short_volume_ratio": 67.84,
      "nyse_short_volume": 15785,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 314123,
      "nasdaq_carteret_short_volume_exempt": 0,
      "nasdaq_chicago_short_volume": 70,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    },
    {
      "ticker": "A",
      "date": "2025-06-13",
      "total_volume": 650207,
      "short_volume": 470923,
      "exempt_volume": 120,
      "non_exempt_volume": 470803,
      "short_volume_ratio": 72.43,
      "nyse_short_volume": 27096,
      "nyse_short_volume_exempt": 0,
      "nasdaq_carteret_short_volume": 443715,
      "nasdaq_carteret_short_volume_exempt": 120,
      "nasdaq_chicago_short_volume": 112,
      "nasdaq_chicago_short_volume_exempt": 0,
      "adf_short_volume": 0,
      "adf_short_volume_exempt": 0
    }
  ],
  "next_url": "https://api.polygon.io/stocks/v1/short-volume?cursor=AAEAAQEKAAEBDQFB"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Stocks/
News
News
GET
/v2/reference/news
Retrieve the most recent news articles related to a specified ticker, along with summaries, source details, and sentiment analysis. This endpoint consolidates relevant financial news in one place, extracting associated tickers, assigning sentiment, and providing direct links to the original sources. By incorporating publisher information, article metadata, and sentiment reasoning, users can quickly gauge market sentiment, stay informed on company developments, and integrate news insights into their trading or research workflows.

Use Cases: Market sentiment analysis, investment research, automated monitoring, and portfolio strategy refinement.

Query Parameters
Reset values
ticker
string
Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.

Show filter modifiers
published_utc
string (date-time, date)
Return results published on, before, or after this date.

Show filter modifiers
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
10
Limit the number of results returned, default is 10 and max is 1000.
sort
enum (string)

published_utc
Sort field used for ordering.
Response Attributes
count
integer
optional
The total number of results for this request.
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
amp_url
string
optional
The mobile friendly Accelerated Mobile Page (AMP) URL.
article_url
string
A link to the news article.
author
string
The article's author.
description
string
optional
A description of the article.
id
string
Unique identifier for the article.
image_url
string
optional
The article's image URL.
insights
array (object)
optional
The insights related to the article.

Show child attributes
keywords
array (string)
optional
The keywords associated with the article (which will vary depending on the publishing source).
published_utc
string
The UTC date and time when the article was published, formatted in RFC3339 standard (e.g. YYYY-MM-DDTHH:MM:SSZ).
publisher
object
Details the source of the news article, including the publisher's name, logo, and homepage URLs. This information helps users identify and access the original source of news content.

Show child attributes
tickers
array (string)
The ticker symbols associated with the article.
title
string
The title of the news article.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient
from polygon.rest.models import (
    TickerNews,
)

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

news = []
for n in client.list_ticker_news(
	order="asc",
	limit="10",
	sort="published_utc",
	):
    news.append(n)

#print(news)

# print date + title
for index, item in enumerate(news):
    # verify this is an agg
    if isinstance(item, TickerNews):
        print("{:<25}{:<15}".format(item.published_utc, item.title))

        if index == 20:
            break
Query URL
GET
https://api.polygon.io/v2/reference/news?order=asc&limit=10&sort=published_utc&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "next_url": "https://api.polygon.io:443/v2/reference/news?cursor=eyJsaW1pdCI6MSwic29ydCI6InB1Ymxpc2hlZF91dGMiLCJvcmRlciI6ImFzY2VuZGluZyIsInRpY2tlciI6e30sInB1Ymxpc2hlZF91dGMiOnsiZ3RlIjoiMjAyMS0wNC0yNiJ9LCJzZWFyY2hfYWZ0ZXIiOlsxNjE5NDA0Mzk3MDAwLG51bGxdfQ",
  "request_id": "831afdb0b8078549fed053476984947a",
  "results": [
    {
      "amp_url": "https://m.uk.investing.com/news/stock-market-news/markets-are-underestimating-fed-cuts-ubs-3559968?ampMode=1",
      "article_url": "https://uk.investing.com/news/stock-market-news/markets-are-underestimating-fed-cuts-ubs-3559968",
      "author": "Sam Boughedda",
      "description": "UBS analysts warn that markets are underestimating the extent of future interest rate cuts by the Federal Reserve, as the weakening economy is likely to justify more cuts than currently anticipated.",
      "id": "8ec638777ca03b553ae516761c2a22ba2fdd2f37befae3ab6fdab74e9e5193eb",
      "image_url": "https://i-invdn-com.investing.com/news/LYNXNPEC4I0AL_L.jpg",
      "insights": [
        {
          "sentiment": "positive",
          "sentiment_reasoning": "UBS analysts are providing a bullish outlook on the extent of future Federal Reserve rate cuts, suggesting that markets are underestimating the number of cuts that will occur.",
          "ticker": "UBS"
        }
      ],
      "keywords": [
        "Federal Reserve",
        "interest rates",
        "economic data"
      ],
      "published_utc": "2024-06-24T18:33:53Z",
      "publisher": {
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/investing.ico",
        "homepage_url": "https://www.investing.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/investing.png",
        "name": "Investing.com"
      },
      "tickers": [
        "UBS"
      ],
      "title": "Markets are underestimating Fed cuts: UBS By Investing.com - Investing.com UK"
    }
  ],
  "status": "OK"
}
Short Volume
Options Overview
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
News | Stocks REST API - Polygon

{
  "results": [
    {
      "id": "YmGmHqaubjrLXVfxM2wfpxHVbEEJiQ4G4PxOl5wDymY",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Polymetal Could Be a Winning Ticket on the Gold Price Rollercoaster",
      "author": "twocents@thestreet.com (Paul Whitfield)",
      "published_utc": "2016-06-22T13:18:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/jHb3j-_w74I/13616096.html",
      "tickers": [
        "AU",
        "GFI"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Gold has been on a rollercoaster in recent trading sessions but brokers at Goldman Sachs are recommending investors hang on for the ride and grab a ticket for the thrills by investing in Polymetal International \n  . \n\"We expect Polymetal to remain one of the few global precious metal minders delivering meaningful volume growth with one of the lowest cash costs globally thanks to macro tailwinds and management focus on cost cutting,\" the broker noted this week as it upgraded its 12-month price forecast to 950 pence ($13.94), from 870 pence. \nPolymetal shares traded Wednesday at 860 pence, with a little more than 10% to go before it hits the Goldman Sachs target. \nUnderpinning Polymetal's prospects are a pair of deals that appear well timed to benefit increases in the price of gold. The Kapan mine in Armenia and the Komarovskoye gold deposit in Kazakhstan, were secured in March and early April, suggesting negotiations took place just as gold was recovering from its turn-of-the-year lows of below $1,060 an ounce. \nThose acquisitions, coupled with the ramping up of its Kyzyl gold project in Kazakhstan will likely boost production by about 40% of the coming five years, or a compound average growth rate (CAGR) of about 6.9% until the end of 2020, Goldman predicts. \nThat is almost twice the growth of  Fresnillo \n  , which ranks second for growth among the big gold producers with a CAGR of 3.5%, while AngloGold \n  is expected to add just 1.4% a year to output and Gold Fields \n  is expected to shrink 2.2% a year, according to Goldman Sachs. \nBetter still Polymetal is not growing at the expense of cost discipline. Its cash cost for an ounce of gold is expected to come in below $573 this year.  That is down 10% since 2014, and should fall to $551 in 2017, according to Goldman's note. By comparison, Gold Fields and AngloGold both spend more than $600 for each ounce they produce. \nAll of that might suggest that Polymetal would trade at a premium to its rivals, yet the opposite is true. Shares are priced at about 12 times forecast 2017 earnings. Rival large gold miners trade at a median closer to 30 times 2017 earnings forecasts, though that figure is inflated by Fresnillo's valuation of about 45 times earnings. \n\"We believe that such a discount for Polymetal vs. peers is unjustified given its superior growth potential and low cost of existing operations as well as assets under development,\" noted Goldman Sachs. \nOf course any investment in Polymetal is also a bet on the gold price, and that has been a white-knuckle ride in recent days. Gold traded Wednesday at about $1,268 an ounce, after slumping on June 20 and 21 from just over $1,298 as fears of a British exit from the European Union receded. \nGold price volatility is all but assured until the results of that vote, which takes place on tomorrow, are released in the early hours of Friday. Yet Goldman said it is confident that support for gold is set to continue in the short term, driven by delays to a Federal Reserve rate hike, loose central bank monetary policy, devaluation of the Chinese currency and a flight to safety as the U.S. election nears.\n                        Click to view a price quote on POYYF.",
      "keywords": [
        "Equities",
        "Analyst Upgrades/Downgrades",
        "Basic Materials",
        "Gold Prices",
        "Metals and Mining",
        "Opinion"
      ]
    },
    {
      "id": "ss-HN5xpsSLzgxTK80Snn_H76Gtk_7xWltzmvc47IUU",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Here's Why Facebook's Instagram Is Leaving Twitter in the Dust",
      "author": "twocents@thestreet.com (Eric Jhonsa)",
      "published_utc": "2016-06-22T20:37:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/LchMMFbMSKM/13616961.html",
      "tickers": [
        "TWTR"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Back in September 2013, Facebook \n   -owned Instagram had just 150 million monthly active users (MAUs) to Twitter's \n    230 million. But as of December 2014, the story was very different: Instagram's user base had doubled to 300 million, while Twitter's had grown a relatively modest 25% to 288 million. \n  \nInstagram's user growth. Source: TechCrunch \nFacebook and Twitter are holdings in Jim Cramer's Action Alerts PLUS Charitable Trust Portfolio. Want to be alerted before Cramer buys or sells FB or TWTR? Learn more now. \nFast-forward to today, and the difference between Instagram and Twitter's growth trajectories is even more striking: Instagram has blown past 500 million MAUs, while Twitter was only at 310 million as of the first quarter. International growth is heavily responsible: 80% of Instagram's users are now outside the U.S., up from 75% last September. \nOn top of this, Instagram says it now has over 300 million daily active users (DAUs), and that 95 million images are being shared daily. Twitter, which doesn't regularly update its DAU count, is estimated by analysts to have 140 million DAUs. DAUs are a better metric than MAUs for gauging how many users have made an Internet service part of their everyday lives. \nWhat accounts for the incredible difference between Instagram and Twitter's growth rates? \nSome of it is Twitter's fault: In spite of numerous product launches and feature changes, the company is still struggling to create an experience that appeals to -- and doesn't confuse or bewilder -- a broader base of social media users. \nBut a lot of it also stems from the huge appeal of Instagram's photo- and video-rich experience to mobile users worldwide, and its laser-like focus on helping users create, view and discover quality photos and videos. Simply put, Instagram understands what it's good at, and what users are loading its app for, and doesn't care to be anything else. \nFacebook integration also hasn't hurt: New Instagram users are given a list of Facebook friends on Instagram to follow, and those friends are alerted to the new user's arrival on Instagram. Users also have the option of simultaneously uploading a photo on both Instagram and Facebook. With Facebook claiming 1.65 billion MAUs and 1.09 billion DAUs for its core service as of March, Instagram's parent is quite the helpful user acquisition tool. \nMassive user growth has been accompanied by equally-impressive ad revenue growth, as Facebook continues an all-out effort to monetize Instagram. This effort has featured everything from launching e-commerce and mobile app install ads and striking deals with big ad agencies, to integrating with third-party ad software and giving marketers access to Facebook's demographic data and advanced targeting tools. \nWhile Facebook doesn't break out Instagram's revenue, Instagram's ad growth is believed to be a big reason why Facebook's total ad revenue rose 57% Y/Y in both the first quarter and the fourth quarter of 2015, up from 45% in the third quarter of 2015. \nIn April, Credit Suisse estimated Instagram would deliver 2016 revenue of $3.2 billion, a figure equal to 12% of Facebook's 2016 revenue consensus of $26.1 billion. And on Wednesday, MKM estimated Instagram could do $3.4 billion in 2016 ad sales if its ad revenue per user grew to match Twitter's. \nMKM thinks Instagram derived only about $2 per user last year versus Twitter's $6.50, but sees the gap narrowing rapidly thanks to Instagram's superior user engagement, Facebook's unmatched ad sales and ad technology resources and the fact that brand advertisers \"are enamored by the rich canvas that Instagram provides.\" \nInstagram's recent shift to an algorithmic timeline view -- photos and videos are no longer shown chronologically, but instead have their order determined by algorithm -- could provide a fresh boost to ad sales, as brands whose posts are pushed down by Instagram's algorithm pay to gain exposure (something similar has happened on Facebook in recent years). \nMeanwhile, Instagram's decision to double the maximum length of a video ad to 60 seconds, a move that coincides with the quadrupling of the max length of a user video to 60 seconds, could strengthen its push to grab TV ad dollars that have been shifting to online video. \nThose changes, together with strong user growth and access to Facebook's massive resources, leave Instagram well-positioned to be a major revenue growth engine for Facebook for at least the next couple of years. It's hardly an exaggeration to say Facebook's $1 billion 2012 acquisition of the photo-sharing platform is looking like one of the best bargains in tech M&A history.\n                        Click to view a price quote on FB.\n                        Click to research the Internet  industry.",
      "keywords": [
        "Equities",
        "Google Editor's Picks",
        "Google Standout Tag",
        "Suppress PS_Text promo"
      ]
    },
    {
      "id": "WFgC547YWQCGVhakq9FI5EDZEi44CklyqW6hytydhnM",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Are Lululemon Executives Delusional About Its Future?",
      "author": "twocents@thestreet.com (Brian Sozzi)",
      "published_utc": "2016-06-22T22:19:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/5QlUXjlurr0/13617165.html",
      "tickers": [
        "NKE",
        "LULU"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Despite Lululemon Athletica \n  experiencing several years of slowing growth amid increased competition from Nike \n  and Under Armour \n  in the female athleticwear space, execs still oddly hold a pretty high opinion on its future. \nDuring an investor presentation Wednesday, Lululemon CFO Stuart Haselden said the company plans to double its sales -- and more than than double its earnings -- by the year 2020. That would roughly bring Lululemon to revenue and net profit of $4.6 billion and $600 million, respectively, using results from last year as starting points. \nWhat's more, the company anticipates doubling sales of its women's and men's businesses over that time-frame to about $3 billion and $1 billion, respectively. \nWhat's driving Lululemon's uber-bullishness other than typical executive hubris? Well, the company is keen on the benefits of an improved pipeline of innovative products, opening more stores in key U.S. and overseas markets, expanding the size of existing stores and partaking fully in the digital shopping age. \nUnfortunately for Lululemon, it may be hard for investors to buy into such an over-the-top outlook due to multiple factors. \nFirst, the trend has not been a friend to Lululemon. The company's gross and operating profit margin have declined for four consecutive years as its once enviable market share has been encroached on by larger apparel competitors and smaller upstarts. \nFurther, the company has bore the brunt of internal operating inefficiencies. Same-store sales have risen by mid-single digit percentages in each of the past three years, down from the blistering double-digit percentage gains when it first burst onto the apparel scene in the mid 2000s. In fact, Lululemon barely doubled its revenue in the five years from 2011 to 2015 when it was on fire in the U.S. -- according to Bloomberg data, sales reached $2.03 billion last year compared to $1 billion in 2011.     \nMeanwhile, Lululemon's present-day performance has been tepid.  \nThe yoga apparel maker reported first-quarter earnings fell 11.8% from the prior year to 30 cents a share excluding one-time items, missing Wall Street forecasts of 31 cents. Total revenue rose 17% to $495 million, narrowly surpassing estimates of $487 million. Comparable-store sales rose 3%, or 5% excluding the influence of the strong dollar. Total comparable-store sales, which include sales online, increased 6% or 8% when stripping out currency fluctuations. Sales online increased 17% in the first quarter from the prior year to $97.6 million. \n\n In the fourth quarter, total comparable-store sales and online sales increased a healthier 11% and 20.8%, respectively.\n \n\n  \n \n\n And \n Lululemon may be experiencing a further slowdown so far in the second quarter. The company forecast second-quarter earnings of 36 cents a share to 38 cents a share, below Wall Street estimates of 39 cents. Total same-store sales, on a constant currency basis, are seen increasing by a mid-single digit percentage, slower than the 8% gain in the first quarter. On a \n June 8 call with analysts, Haselden acknowledged that traffic to its stores were weak in May and remained soft into the early stages of June. \n \n \n \n   \n  \n \n  Lululemon went on to leave its full-year guidance unchanged likely as it banks on a bumper holiday season. It sees earnings of $2.05 to $2.15 a share, which was below Wall Street estimates for $2.16 a share.\n  \n \n   \n  \n \n   \n  \n \n   \n  \n \n   \n  \n\n                        Click to view a price quote on LULU.\n                        Click to research the Consumer Non-Durables  industry.",
      "keywords": [
        "Equities",
        "Breaking News",
        "Consumer Durables",
        "Consumer Goods",
        "Online Retail",
        "Opinion",
        "Retail"
      ]
    },
    {
      "id": "UH_SBlXP6vmK2huhwHe6w_3VpFrUG9k_sLaaliUKqq0",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Jim Cramer -- Bed Bath Needs Someone Who Knows What Customers Want",
      "author": "twocents@thestreet.com (Bret Kenwell)",
      "published_utc": "2016-06-23T14:31:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/zGUcjdTVUY8/13617892.html",
      "tickers": [
        "BBBY",
        "M"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Bed Bath & Beyond  \n   shares are up over 2% Thursday despite the company missing on earnings per share and revenue expectations. \nGuidance was unimpressive and inventories were a little high, too, TheStreet's Jim Cramer, co-manager of the Action Alerts PLUS portfolio, said on CNBC's \"Mad Dash\" segment. Comp-store sales results came in light while gross margins contracted. This was followed by a \"not great conference call,\" Cramer added. \nCramer is not impressed. What the company needs, he said, is \"someone young\" who knows what customers want and can make a big push online. \nYes, management did discuss the company's recent acquisition of online retailer One Kings Lane, but didn't call it a savior, Cramer said. Bed Bath & Beyond is full of terrific merchants who know retail but they are just not getting it done anymore. \nWhy? Because Bed Bath & Beyond, like Macy's \n   and other traditional retailers, continues to feel the pinch from online retailers starting Amazon  \n  . Unlike Macy's, however, Bed Bath doesn't have the type of dividend to keep investors interested, yielding just 1.15% to Macy's 4.5%. \nInstead, the company has been buying back a ton of stock, which now appears to be an obvious mistake, Cramer explained. The stock has dropped almost 40% on the year and is down 17% over the past five years.  \n \n                        Click to view a price quote on BBBY.\n                        Click to research the Retail  industry.",
      "keywords": [
        "Equities",
        "How to Invest",
        "JRC Top 5",
        "Jim Cramer Stock Picks",
        "Opinion",
        "Stock Picks"
      ]
    },
    {
      "id": "5yZ34MJpcLQF4BHvC_YPzzFaV1HqvwsiYBzz4FingeM",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Take-Two CEO Discusses Company's Outlook Amid Robust Revenue, Profit",
      "author": "twocents@thestreet.com (Brian Sozzi)",
      "published_utc": "2016-06-23T23:26:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/lbX_wiv21Hc/13618753.html",
      "tickers": [
        "TTWO",
        "EA"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "It has been game on for Grand Theft Auto publisher Take Two Interactive \n  . The company, which also develops well-known titles Red Dead Redemption, NBA 2K, Civilization and WWE 2K, ended fiscal 2016 with its third consecutive year of stronger-than-expected sales and profit. \nSales for the year-ended March 31 fell 6.4% to $1.56 billion, as last year benefited from a more extensive title release slate such as the launch of Grand Theft Auto V on PlayStation 4 and Xbox One. But sales outperformed the company's original outlook of $1.3 billion to $1.4 billion. Earnings for the year tallied $1.96 a share compared to an outlook of 75 cents to $1.00 a share offered at the start of the fiscal year. \nSales in the fourth quarter clocked in at $342.5 million compared to guidance for $260 million to $310 million due primarily to stronger than expected results from Grand Theft Auto V and Grand Theft Auto Online. NBA 2K16 also exceeded Take-Two's sales expectations. \nThe better-than-anticipated performance in what remains a crowded videogame space -- made no easier by the competition for consumer eyeballs with Netflix \n  -- has led investors to snatch up Take-Two's stock. Shares have surged 30% over the past year, outperforming the Nasdaq Composite's 4.3% decline. \nWith another solid year under its belt, attention has turned to when Take-Two will unveil Grand Theft Auto 6 to capitalize on GTA 5's success in selling over 65 million copies since its launch a couple years ago. So far, Take-Two has not issued a release date, instead focusing on continuing to upgrade the gameplay for GTA 5 in order to keep consumers hooked. \nBut, seeing as GTA 5 has been on the market for over two and a half years, it's only natural to wonder what's taking Take-Two so long to launch the next iteration in the popular franchise. \n\"We aim for perfection and that takes time,\" Take-Two Interactive chairman and CEO Strauss Zelnick told TheStreet, adding, \"By resting our core products and not being on an annualized schedule we build anticipation.\" Zelnick pointed out that frequent new content releases for a title like Grand Theft Auto keeps people engaged and drives recurring consumer spending. \nMeanwhile, it's also natural to wonder if Take-Two's solid performance and bulging cash balance has caught the attention of fellow publishers who may want to bulk up via an acquisition. Take-Two is no stranger to being courted. Rival Electronic Arts \n  made a hostile $2 billion bid for Take Two back in 2008, which was early on in Zelnick's leadership of the company. Now, Electronic Arts appears to be on the acquisition hunt again, and its CEO hasn't ruled out making a play for Take-Two. \n\"For the last three years, we have been very focused on our company and getting it right in terms of culture and reinvigorating the company,\" Electronic Arts CEO Andrew Wilson told TheStreet in a recent interview when asked about revisiting Take-Two. Wilson, who was at Electronic Arts when it went hostile for Take-Two, added, \"We are now at a place where we think we are in a really good position, and so we are open to acquisitions for the first time I would say in the last few years.\" \nZelnick didn't completely kill the notion of sitting down with Electronic Arts, either. \"We like being independent, and equally we are here for the shareholders -- I think we are really proud of the track record of building value for our shareholders, the stock just hit an all-time high,' said Zelnick. \nIn the meantime, Take-Two will look to capitalize on pre-holiday launches such as Mafia III, NBA 2K17, WWE 2K17 and Sid Meier's Civilization VI. ity.\n                        Click to view a price quote on TTWO.\n                        Click to research the Computer Software &  Services  industry.",
      "keywords": [
        "Equities",
        "Investing",
        "Opinion"
      ]
    },
    {
      "id": "dnVHMq8NlVlZD_eyLEQ-tpbbdop158dV7ApVy0vaivo",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Nikkei 225 Clocks Up 16-Year Record Decline",
      "author": "twocents@thestreet.com (Mariko Iwasaki)",
      "published_utc": "2016-06-24T08:57:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/cOhLWHhC-Uk/13618826.html",
      "tickers": [
        "TM"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Asian markets plunged as it emerged the U.K. had voted to quit the European Union in Thursday's referendum. \nIn Tokyo, investors fled to the yen in search for a safe haven, causing the stock markets to tumble. The yen soared against the pound by 11.13% to  yen 140.302 and against the euro by 6.02% to yen 113.59. Against the dollar, the yen strengthened 3.24% to yen 102.72. \nAs the yen surged, the Japanese stock markets tumbled. The Nikkei 225 plunged 7.92% to close at 14,952.02--the lowest level in 20 months and the largest decline since April 17, 2000. The Topix fell 7.3% to 1,204.48. Major exporters suffered, with share prices down 8.7% for Toyota Motor  \n  , 8.0% for Sony  \n  , 16.5% for Sharp, 5.7% for Canon CAJ, 10.3% for Hitachi, 8.4% for Fuji Heavy Industries, and 10.2% for Murata Manufacturing. Fast Retailing, known for its Uniqlo brand, saw its share price plunge 10.4%. \n\"USDJPY could trade stronger driven by risk aversion and lower yields,\" UBS said in a research note.\"In their estimates, a range of 94-102 would reflect the relevant risks, although a sharp move below 100 could invite a policy response. \nPolicymakers made an effort to respond to the U.K. referendum outcome with calm. \nThe Bank of Japan Governor Haruhiko Kuroda pledged to ensure stability in the financial market. \n\"The BOJ will keep in close contact with the relevant authorities in Japan and overseas and keep a close watch on the impact the result of the referendum will have on the international financial markets,\" Kuroda said. \"We will make efforts to stabilize the financial market by making use of the swap rule whereby the central banks of Japan, America, Canada, the Eurozone, Switzerland, and the U.K. accommodate currencies for one another, while at the same time take all possible measures to ensure liquidity.\" \nElsewhere in Asia, the Shanghai Composite index was down 1.30%, the Hang Seng fell 4.06%, the CSI 300 index dropped 1.29%, the South Korean Kospi  fell 3.09%, and S&P/ASX 200 index in Sydney dropped 3.17%. \nOne key focus following the vote will be how Chinese investors interact with the U.K. and Europe. \n\"A key concern for many Chinese firms who have invested in the U.K. is that Brexit will see their business suffer because they will find it difficult to access EU markets from Britain,\" said University o fWarwick professor Kamel Mellahi. \"\"A significant number of Chinese businesses see the U.K. strategically placed as a gateway to EU markets, but with a Brexit they may put on hold investment in the U.K. until a clearer picture over trade deals with the EU emerges... . If one goes by what has been widely reported by Chinese corporate leaders, Brexit will dampen the appeal of the UK for Chinese investors.\"\n                        Click to view a price quote on TM.\n                        Click to research the Automotive  industry.",
      "keywords": [
        "Equities",
        "China",
        "Consumer Durables",
        "Electronics",
        "Japan",
        "Machinery and Tools"
      ]
    },
    {
      "id": "7CenVx-o8ORHQiws3mD-NPwoR37a3r02DRuPr8AjjRc",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Why 'Brexit' Isn't a Big Deal for McDonald's",
      "author": "twocents@thestreet.com (Brian Sozzi)",
      "published_utc": "2016-06-24T14:20:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/Qb-7AuRei6o/13619006.html",
      "tickers": [
        "DPZ"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "For years, McDonald's \n  has capitalized on the tepid economic growth and political unrest in the U.K. that has caused consumers there to seek out cheap fast food and deep discounts on clothing.  \nSo, Brexit-related economic and political chaos shouldn't be too big an issue for the Golden Arches, which operates over 1,200 restaurants in the country. In fact, it may even help extend one remarkable stat: This year's first quarter marked the 40th consecutive quarter of same-store sales growth for McDonald's U.K. arm as it benefited from the introduction of new touchscreen ordering systems and premium burgers, as well as a continued focus on promotions. \nMore recently, the division -- which is often used to incubate new food and customer service ideas -- launched new \"flavor wraps,\" in addition to a burger with a bagel as a bun (below). And the performance of the U.K. division likely makes McDonald's CEO Steve Easterbrook particularly proud. Born in the U.K., Easterbrook first worked for McDonald's as a manager at a London location and eventually became CEO of McDonald's U.K., where he engineered a dramatic turnaround in results. \n \n Ok so this was sold at McDonald's in the UK as the New York Stack. Kinda a burger on a bagel things. pic.twitter.com/N0T8ApCdhp — William Lumpkin (@Infojanitor) \n June 6, 2016\n \nOn Friday morning, shares of McDonald's were trading down 0.3% to $120.91, compared to a 2.1% decline in the S&P 500. \nWhile McDonald's U.K. is likely to serve up newly independent Brits tons of affordable fast food in coming quarters, performance at the company's largest market -- the U.S. -- may prove to a bit more mixed.   \n\"Traffic is still negative at McDonald's as the chain continues to wrestle with a Dollar Menu hangover, and prices of its premium items that are perhaps too high for perceived quality relative to chains such as Chick-fil-A or In 'N Out,\" wrote RBC restaurant analyst David Palmer in a note to clients Tuesday. \nPalmer, who slashed his second-quarter sales growth estimate for McDonald's to 2.5% from 3.5%, added that \"finding the right value message remains a struggle, which is leading to negative traffic and varied sales trends around the country.\" \nMcDonald's eliminated its popular Dollar Menu earlier this year when it was no longer profitable for many franchisees. In its place, the company unveiled several new value menus designed to win over customers. \nThe company launched the \"McPick 2\" menu in January, which lets customers select two items from a list of a double cheeseburger, small fries, a McChicken or mozzarella sticks for $2. But in February, McDonald's replaced that promotion with a McPick 2 for $5 menu that featured the Big Mac, 10-piece Chicken McNuggets, Filet-O-Fish and Quarter Pounder with Cheese. \nMeanwhile, McDonald's fast-food competitors have been more ruthless on the promotional front. In March, Yum! Brands'  \n  Taco Bell took the wraps off a new nationwide $1 breakfast menu that took aim at McDonald's pricier Egg McMuffin. The $1 breakfast menu -- which is permanent -- consists of 10 items. \nDomino's Pizza \n  continues to market a medium two-topping pizza for $5.99, which arguably provides more value to a family than buying two Big Macs for $5. And Pizza Hut, also owned by Yum! Brands, has also found success lately aggressively marketing affordable pizza. \nOn Wednesday, Nomura analyst Mark Kalinowski downgraded his rating on McDonald's to neutral from buy, citing slowing industry sales in the U.S. and tough sales comparisons for the Golden Arches. The analyst slashed his price target on McDonald's to $129 from $142.\n                        Click to view a price quote on MCD.\n                        Click to research the Leisure  industry.",
      "keywords": [
        "Equities",
        "Breaking News",
        "Consumer Goods",
        "Consumer Non-Durables",
        "Food and Beverage",
        "Online Retail",
        "Restaurants",
        "Retail",
        "Specialty Retail",
        "Suppress PS_Text promo"
      ]
    },
    {
      "id": "n7sw009o2FjaZc8Yyin73NtgGARa86jlV_PdqrcBIu4",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "WTI Crude Plummets With Brexit; Oil-Levered Names Feel the Hurt",
      "author": "twocents@thestreet.com (Tom Terrarosa)",
      "published_utc": "2016-06-24T15:06:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/SpeDbStoZxA/13619332.html",
      "tickers": [
        "XOM",
        "MRO",
        "CVX"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "Just as the oil and gas industry started to see signs of renewed life in the U.S., the United Kingdom appears to have sent a title wave crashing down on commodity markets. \nWest Texas Intermediate futures, the U.S. crude oil benchmark, were down more than 5% to $47.56 as the stock markets prepared to open Friday. Futures for the global benchmark, Brent Crude, were down nearly 5.4% to $48.18.  \nU.S. stock markets also saw their steepest decline in 10 months as the Dow Jones Industrial Average plummeted by 400 points to start the day, the S&P 500 opened down 37 points, and the Nasdaq Composite took its largest daily hit since 2011, beginning the session down 186 points, or 3.8%. \nWhile the effect of the so-called Brexit weighing heavily across the board, diversified oil and gas behemoths like ExxonMobil \n    and Chevron \n    took a relatively modest hit in share prices, both down less than 2% near 10 a.m. Friday.  \nNot surprisingly, oil and gas players that are more heavily levered to commodity prices, such as U.S. independent explorers and producers QEP Resources \n   , Pioneer Natural Resources \n    and Marathon Oil \n   , were all suffering greater losses between 3% and 4% early Friday.  \nThe drop in oil prices following Brexit can be largely linked to a bolstered dollar, which saw as much as a 3.7% increase Friday, as a stronger dollar typically depresses oil prices.  \nBut fear not says BMI Research, a market analysis firm, in the long-term the UK's Brexit vote will have a limited impact on the global crude oil market. \n\"Risk-off trading will depress prices in the coming days, but positive physical fundamentals - which remain unchanged in the wake of the vote - will see any losses quickly pared. However, we highlight strong downside risks to North Sea investments, due to renewed uncertainty surrounding Scottish independence,\" BMI analysts wrote in a Friday report. \"Heightened volatility and broad risk-off sentiment pose further downside risk to prices [temporarily]. However, declines will be capped by firming fundamentals in the physical crude oil market and we expect any losses to be rapidly reversed.\" \nOn the other hand, the firm also warns that the Brexit vote is \"a potential trigger for wider and more sustained financial market weakness\" and has raised the odds on other tail-risk events, such as a U.S. recession, Chinese yuan devaluation and a fiscal crisis in Japan.  \nMeanwhile, the commodities market could take another blow later today as Baker Hughes is set to release its weekly rig report at 1 p.m. \nAfter three consecutive weeks of reported rig increases, a fourth uptick in active rigs could mean operators are putting rigs back to work sooner than expected, and even though analysts have warned that production tends to lag increased rig activity significantly, some have noted that a lower-than-expected U.S. production decline could hinder a global oil rally. \n                        Click to view a price quote on XOM.\n                        Click to research the Energy  industry.",
      "keywords": [
        "Equities",
        "Energy",
        "Google Editor's Picks",
        "Industrial Goods"
      ]
    },
    {
      "id": "q53JHilhhX7eigtJHU_diWxyhU7TUhm8vLFDB5wKkM4",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Cramer Says Steer Clear of Financials Amid 'Brexit' Fallout",
      "author": "twocents@thestreet.com (Laura Sanicola)",
      "published_utc": "2016-06-24T17:05:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/A_z_y5ryzKY/13619510.html",
      "tickers": [
        "GS",
        "JPM",
        "LYG"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "While the financial sector took the biggest hit after the U.K. voted to leave the EU, the fallout and disruption in the global markets does not necessarily provide a buying opportunity in the sector. \n\"Financials are not a buy,\" said Jim Cramer, adding that he is most concerned about the big international banks. \"These are not the opportunities I've been waiting for to get people to buy stocks,\" said Cramer, TheStreet's co-founder and portfolio manager of the Action Alerts Plus portfolio. \nThe S&P 500 dropped 3.08% lower to right around 2,050 midday Friday and financials saw a 4% decline. \nThe Dow Jones Industrial Average dropped more than 500 points in mid-day trading. \nLloyds Banking Group's \n  New York-listed shares were down 24.74% at 3.27. Barclays \n    traded down 20.13% at $8.93 per share midday Friday. Royal Bank of Scotland \n    traded down 22.76% at $5.78. \nIn other financials: JPMorgan \n  traded down almost 5% at $60.92 while Goldman Sachs \n  shares were down 5.33% at $144.53.  \nCramer advises holding off on buying or selling in the current market conditions. \nThe executives of several financials responded on Friday morning in attempts to reassure their workers and the public that they should remain confident in the banks' relationship with the UK. \nCEO of Barclays Jes Staley told his staff earlier that his company was not straying from its course, writing that \"the strategy we announced on 1 March was not conditional on the U.K. remaining in the E.U. We are a transatlantic consumer, corporate and investment bank, anchored in the U.K. and the U.S. That remains the core of our strength and the Barclays of the future.\" \nLloyds CEO Antonio Horta-Osorio told his employees Friday that the bank will \"work at pace\" on its contingency plans in an attempt to quell fears over Brexit. \n\"As one of the U.K.'s best capitalised banks we remain committed to helping Britain prosper, continuing our support for the U.K. economy, and providing banking and insurance services that our customers rely on,\" he wrote. \nDouglas Flint, chairman of HSBC, stated that \"our commitment to British businesses, customers and staff in the UK remains undiminished.\" \n  \nSee full Brexit coverage here.\n                        Click to view a price quote on LYG.\n                        Click to research the Banking  industry.",
      "keywords": [
        "Equities",
        "Banks",
        "Financial Services"
      ]
    },
    {
      "id": "C5GLfLdWZOsCzDoz_QDV-luhuqhYkWpJnsx_j2GBvxk",
      "publisher": {
        "name": "TheStreet",
        "homepage_url": "https://www.thestreet.com/",
        "logo_url": "https://s3.polygon.io/public/assets/news/logos/thestreet.svg",
        "favicon_url": "https://s3.polygon.io/public/assets/news/favicons/thestreet.png"
      },
      "title": "Baker Hughes Rig Decline May Subdue U.S. Oil Tension After Brexit",
      "author": "twocents@thestreet.com (Tom Terrarosa)",
      "published_utc": "2016-06-24T17:33:00Z",
      "article_url": "http://feeds.thestreet.com/~r/tsc/feeds/rss/p/real-money/~3/gqFdu_XT_S4/13619528.html",
      "tickers": [
        "XOM",
        "CVX"
      ],
      "image_url": "https://s.thestreet.com/files/tsc/tst_fb.jpg",
      "description": "After a three-week rally, Baker Hughes' \n   reports the number of active U.S. oil and gas rigs is down, falling to 421 this week, an decrease of 3 rigs over last week. \nU.S. oil rigs down significantly by 7 to 330 from 337 last week, while U.S. natural gas rigs were up 4 to 90 versus 86 last week and miscellaneous rigs came in the same at 1. \nThe U.S. offshore rig count remained stable once again this week at 21, but is down 7 rigs year over year. \nWhile the recent increase of U.S. active rigs had been somewhat expected at this stage in the cycle and a fairly positive event in recent weeks, following U.S. and global crude oil's reaction to the United Kingdom's break from the European Union, the market could have been further stressed by the count's continued ascent. West Texas Intermediate crude futures, the U.S. benchmark, were down 4.7% to $47.77 at 1 p.m., while the global Brent crude benchmark saw futures down 4.6% to $48.54. \nIn short, rigs being put back to work earlier than many analysts expected could signal operators are working their way through drilled but uncompleted wells, or DUCs, which therefore entails that U.S. production could see less of a decline than anticipated.   \nThe International Energy Agency has hinted toward this outcome in recent weeks, leading many, including longtime oil market bear Goldman Sachs, to believe the commodity recovery remains in a fragile state. Prior to a commodity rally beginning in March, industry followers saw little hope for rigs going back to work in 2016, and even after prices seemed to stabilize near $50 per barrel, bullish analysts have only pulled up forecasts to the tail-end of 2016. \nBut according to TheStreet's founder Jim Cramer, and as BHI's report demonstrated Friday, data that we're getting about oil continues to show a decline in the amount of drilling, leading him to believe oil remains between $45 and $50 per barrel, despite recent breakouts from powerhouses ExxonMobil \n    and Chevron \n   , which suggest oil is heading toward $80.  \n\"I don't think [oil] is doing that,\" Cramer explained, adding that recent positive movement of oil stocks like Pioneer Natural Resources \n    despite oil's fall illustrates the lack of opportunities for buying oil stocks now. \"I don't see any bargains in oil.\" \nA sooner-than-expected uptick in U.S. drilling, which has fallen dramatically as companies drastically cut capital expenditures through 2015 and into the first quarter of 2016 when oil prices hit a 12-year low, could halt improvement in a global oversupply of oil that has been dampened in recent months with exogenous production disruptions in Canada, Nigeria and elsewhere.  \nAnd while many analysts, such as the KLR Group's Darren Gacicia, insist that the supply-demand imbalance is headed toward correcting itself, others, including Cantor Fitzgerald's Brad Carpenter have opined that U.S. producers' insistence on adding rigs in a $50 oil world could prove self-defeating and cause a delay in a West Texas Intermediate crude oil rally that at one point did not see oil above that mark until 2018.  \nNevertheless, the market could feel some relief Friday after seeing the U.S. lose the majority of what it gained last week in oil rigs, an event that signals continue volatility in the count and shines light on the looming theory that $50 may not be the magic number. \n                        Click to view a price quote on XOM.\n                        Click to research the Energy  industry.",
      "keywords": [
        "Equities",
        "Energy",
        "Google Editor's Picks",
        "Industrial Goods"
      ]
    }
  ],
  "status": "OK",
  "request_id": "2cae320bb573fb2b4adfc090164a04ac",
  "count": 10,
  "next_url": "https://api.polygon.io/v2/reference/news?cursor=YXA9MjAxNi0wNi0yNFQxNyUzQTMzJTNBMDBaJmFzPUM1R0xmTGRXWk9zQ3pEb3pfUURWLWx1aHVxaFlrV3BKbnN4X2oyR0J2eGsmb3JkZXI9YXNjZW5kaW5n"
}




Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Indices/
Tickers/
All Tickers
All Tickers
GET
/v3/reference/tickers
Retrieve a comprehensive list of ticker symbols supported by Polygon.io across various asset classes (e.g., stocks, indices, forex, crypto). Each ticker entry provides essential details such as symbol, name, market, currency, and active status.

Use Cases: Asset discovery, data integration, filtering/selection, and application development.

Query Parameters
Reset values
ticker
string
Specify a ticker symbol. Defaults to empty string which queries all tickers.

Show filter modifiers
type
enum (string)

Select
Specify the type of the tickers. Find the types that we support via our Ticker Types API. Defaults to empty string which queries all types.
market
enum (string)

indices
Filter by market type. By default all markets are included.
exchange
string
Specify the primary exchange of the asset in the ISO code format. Find more information about the ISO codes at the ISO org website. Defaults to empty string which queries all exchanges.
cusip
string
Specify the CUSIP code of the asset you want to search for. Find more information about CUSIP codes at their website. Defaults to empty string which queries all CUSIPs.

Note: Although you can query by CUSIP, due to legal reasons we do not return the CUSIP in the response.
cik
string
Specify the CIK of the asset you want to search for. Find more information about CIK codes at their website. Defaults to empty string which queries all CIKs.
date
string
Specify a point in time to retrieve tickers available on that date. Defaults to the most recent available date.
search
string
Search for terms within the ticker and/or company name.
active
boolean

true
Specify if the tickers returned should be actively traded on the queried date. Default is true.
order
enum (string)

asc
Order results based on the `sort` field.
limit
integer
100
Limit the number of results returned, default is 100 and max is 1000.
sort
enum (string)

ticker
Sort field used for ordering.
Response Attributes
count
integer
optional
The total number of results for this request.
next_url
string
optional
If present, this value can be used to fetch the next page of data.
request_id
string
optional
A request id assigned by the server.
results
array (object)
optional
An array of tickers that match your query.

Note: Although you can query by CUSIP, due to legal reasons we do not return the CUSIP in the response.

Hide child attributes
active
boolean
optional
Whether or not the asset is actively traded. False means the asset has been delisted.
cik
string
optional
The CIK number for this ticker. Find more information here.
composite_figi
string
optional
The composite OpenFIGI number for this ticker. Find more information here
currency_name
string
optional
The name of the currency that this asset is traded with.
delisted_utc
string
optional
The last date that the asset was traded.
last_updated_utc
string
optional
The information is accurate up to this time.
locale
enum (us, global)
The locale of the asset.
market
enum (stocks, crypto, fx, otc, indices)
The market type of the asset.
name
string
The name of the asset. For stocks/equities this will be the companies registered name. For crypto/fx this will be the name of the currency or coin pair.
primary_exchange
string
optional
The ISO code of the primary listing exchange for this asset.
share_class_figi
string
optional
The share Class OpenFIGI number for this ticker. Find more information here
ticker
string
The exchange symbol that this item is traded under.
type
string
optional
The type of the asset. Find the types that we support via our Ticker Types API.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

tickers = []
for t in client.list_tickers(
	market="indices",
	active="true",
	order="asc",
	limit="100",
	sort="ticker",
	):
    tickers.append(t)

print(tickers)
Query URL
GET
https://api.polygon.io/v3/reference/tickers?market=indices&active=true&order=asc&limit=100&sort=ticker&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 1,
  "next_url": "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmZGF0ZT0yMDIxLTA0LTI1JmxpbWl0PTEmb3JkZXI9YXNjJnBhZ2VfbWFya2VyPUElN0M5YWRjMjY0ZTgyM2E1ZjBiOGUyNDc5YmZiOGE1YmYwNDVkYzU0YjgwMDcyMWE2YmI1ZjBjMjQwMjU4MjFmNGZiJnNvcnQ9dGlja2Vy",
  "request_id": "e70013d92930de90e089dc8fa098888e",
  "results": [
    {
      "active": true,
      "cik": "0001090872",
      "composite_figi": "BBG000BWQYZ5",
      "currency_name": "usd",
      "last_updated_utc": "2021-04-25T00:00:00Z",
      "locale": "us",
      "market": "stocks",
      "name": "Agilent Technologies Inc.",
      "primary_exchange": "XNYS",
      "share_class_figi": "BBG001SCTQY4",
      "ticker": "A",
      "type": "CS"
    }
  ],
  "status": "OK"
}
Indices Overview
Ticker Overview
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
All Tickers | Indices REST API - Polygon


{
  "results": [
    {
      "ticker": "I:A1BSC",
      "name": "Dow Jones Americas Basic Materials Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1CYC",
      "name": "Dow Jones Americas Consumer Services Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1DOW",
      "name": "Dow Jones Americas Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1ENE",
      "name": "Dow Jones Americas Oil & Gas Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1FIN",
      "name": "Dow Jones Americas Financials Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1HCR",
      "name": "Dow Jones Americas Health Care Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1IDU",
      "name": "Dow Jones Americas Industrials Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1NCY",
      "name": "Dow Jones Americas Consumer Goods Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1SGI",
      "name": "Dow Jones Sustainability North America Composite Index (USD)",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1TEC",
      "name": "Dow Jones Americas Technology Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1TLS",
      "name": "Dow Jones Americas Telecommunications Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:A1UTI",
      "name": "Dow Jones Americas Utilities Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:AAVE100",
      "name": "Cboe 100 Aave / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:AAVE10RP",
      "name": "Cboe 10 Aave / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:AAVE25RP",
      "name": "Cboe 25 Aave / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:AAVE400",
      "name": "Cboe 400 Aave / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:AAVE50RP",
      "name": "Cboe 50 Aave / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ABAQ",
      "name": "ABA NASDAQ Community Bank",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "NasdaqGIDS"
    },
    {
      "ticker": "I:ABQI",
      "name": "NASDAQ OMX ABA Community Bank",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "NasdaqGIDS"
    },
    {
      "ticker": "I:ABQX",
      "name": "NASDAQ OMX ABA Community Bank Total Rtn",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "NasdaqGIDS"
    },
    {
      "ticker": "I:ADA100K",
      "name": "Cboe 100K Cardano / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ADA10KRP",
      "name": "Cboe 10K Cardano / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ADA25KRP",
      "name": "Cboe 25K Cardano / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ADA50KRP",
      "name": "Cboe 50K Cardano / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ADA5KRP",
      "name": "Cboe 5000 Cardano / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ADOW",
      "name": "The Asia Dow (USD)",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:ADOWA",
      "name": "The Asia Dow (AUD)",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:ADOWE",
      "name": "The Asia Dow (EUR)",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:ADOWJ",
      "name": "The Asia Dow (JPY)",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CMEMarketDataPlatformDowJones"
    },
    {
      "ticker": "I:AGQIV",
      "name": "PROSHARES ULTRA SILVER ETF",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesINAV"
    },
    {
      "ticker": "I:ALGO100",
      "name": "Cboe 100 Algorand / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ALGO1KRP",
      "name": "Cboe 1000 Algorand / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:ALGO5KRP",
      "name": "Cboe 5000 Algorand / US Dollar RealPrice Index",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesCCCY"
    },
    {
      "ticker": "I:AMBOR1M",
      "name": "AMERIBOR 1 Month Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR1W",
      "name": "AMERIBOR 1 Week Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR1Y",
      "name": "AMERIBOR 1 Year Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR2Y",
      "name": "AMERIBOR 2 Year Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR30",
      "name": "30 Day Average AMERIBOR Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR30T",
      "name": "AMERIBOR Term-30 Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR3M",
      "name": "AMERIBOR 3 Month Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR6M",
      "name": "AMERIBOR 6 Month Spot Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR90",
      "name": "90 Day Average AMERIBOR Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOR90T",
      "name": "AMERIBOR Term-90 Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOS",
      "name": "One Month AMERIBOR Average Settlement",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBOX",
      "name": "One Month AMERIBOR Average Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBRS",
      "name": "14 Day AMERIBOR Average Settlement",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBRX",
      "name": "14 Day AMERIBOR Average Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBTS",
      "name": "Three Month AMERIBOR Compound Average Settlement",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBTX",
      "name": "Three Month AMERIBOR Compound Average Rate",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    },
    {
      "ticker": "I:AMBWS",
      "name": "7 Day AMERIBOR Average Settlement",
      "market": "indices",
      "locale": "us",
      "active": true,
      "source_feed": "CboeGlobalIndicesMain"
    }
  ],
  "status": "OK",
  "request_id": "3455b53f8064b7624fe41542b559418d",
  "count": 100,
  "next_url": "https://api.polygon.io/v3/reference/tickers?cursor=YWN0aXZlPXRydWUmYXA9SSUzQUIzNUdJJTdDMzM3YjM2MDFhNTFkZjJiMDRjZjc0ODc4YmZmMDkxMGJlMjM5MTExZDQ2OWMzNTllMmY1ZjQ4MDZiNzZmOGJiOCZhcz0mZGF0ZT0yMDI1LTA2LTI5JmxpbWl0PTEwMCZtYXJrZXQ9aW5kaWNlcyZvcmRlcj1hc2Mmc29ydD10aWNrZXI"
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Indices/
Tickers/
Ticker Overview
Ticker Overview
GET
/v3/reference/tickers/{ticker}
Retrieve comprehensive details for a single ticker supported by Polygon.io. This endpoint offers a deep look into a company’s fundamental attributes, including its primary exchange, standardized identifiers (CIK, composite FIGI, share class FIGI), market capitalization, industry classification, and key dates. Users also gain access to branding assets (e.g., logos, icons), enabling them to enrich applications and analyses with visually consistent, contextually relevant information.

Use Cases: Company research, data integration, application enhancement, due diligence & compliance.

Path Parameters
Reset values
ticker
string
required
AAPL
The ticker symbol of the asset.
Query Parameters
date
string
Specify a point in time to get information about the ticker available on that date. When retrieving information from SEC filings, we compare this date with the period of report date on the SEC filing.

For example, consider an SEC filing submitted by AAPL on 2019-07-31, with a period of report date ending on 2019-06-29. That means that the filing was submitted on 2019-07-31, but the filing was created based on information from 2019-06-29. If you were to query for AAPL details on 2019-06-29, the ticker details would include information from the SEC filing.

Defaults to the most recent available date.
Response Attributes
count
integer
optional
The total number of results for this request.
request_id
string
optional
A request id assigned by the server.
results
object
optional
Ticker with details.

Hide child attributes
active
boolean
Whether or not the asset is actively traded. False means the asset has been delisted.
address
object
optional
Company headquarters address details.

Show child attributes
branding
object
optional
Provides URLs aiding in visual identification.

Show child attributes
cik
string
optional
The CIK number for this ticker. Find more information here.
composite_figi
string
optional
The composite OpenFIGI number for this ticker. Find more information here
currency_name
string
The name of the currency that this asset is traded with.
delisted_utc
string
optional
The last date that the asset was traded.
description
string
optional
A description of the company and what they do/offer.
homepage_url
string
optional
The URL of the company's website homepage.
list_date
string
optional
The date that the symbol was first publicly listed in the format YYYY-MM-DD.
locale
enum (us, global)
The locale of the asset.
market
enum (stocks, crypto, fx, otc, indices)
The market type of the asset.
market_cap
number
optional
The most recent close price of the ticker multiplied by weighted outstanding shares.
name
string
The name of the asset. For stocks/equities this will be the companies registered name. For crypto/fx this will be the name of the currency or coin pair.
phone_number
string
optional
The phone number for the company behind this ticker.
primary_exchange
string
optional
The ISO code of the primary listing exchange for this asset.
round_lot
number
optional
Round lot size of this security.
share_class_figi
string
optional
The share Class OpenFIGI number for this ticker. Find more information here
share_class_shares_outstanding
number
optional
The recorded number of outstanding shares for this particular share class.
sic_code
string
optional
The standard industrial classification code for this ticker. For a list of SIC Codes, see the SEC's SIC Code List.
sic_description
string
optional
A description of this ticker's SIC code.
ticker
string
The exchange symbol that this item is traded under.
ticker_root
string
optional
The root of a specified ticker. For example, the root of BRK.A is BRK.
ticker_suffix
string
optional
The suffix of a specified ticker. For example, the suffix of BRK.A is A.
total_employees
number
optional
The approximate number of employees for the company.
type
string
optional
The type of the asset. Find the types that we support via our Ticker Types API.
weighted_shares_outstanding
number
optional
The shares outstanding calculated assuming all shares of other share classes are converted to this share class.
status
string
optional
The status of this request's response.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

details = client.get_ticker_details(
	"AAPL",
	)

print(details)
Query URL
GET
https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
All Tickers
Custom Bars
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Overview | Indices REST API - Polygon

{
  "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
  "results": {
    "active": true,
    "address": {
      "address1": "One Apple Park Way",
      "city": "Cupertino",
      "postal_code": "95014",
      "state": "CA"
    },
    "branding": {
      "icon_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
      "logo_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg"
    },
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "currency_name": "usd",
    "description": "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
    "homepage_url": "https://www.apple.com",
    "list_date": "1980-12-12",
    "locale": "us",
    "market": "stocks",
    "market_cap": 2771126040150,
    "name": "Apple Inc.",
    "phone_number": "(408) 996-1010",
    "primary_exchange": "XNAS",
    "round_lot": 100,
    "share_class_figi": "BBG001S5N8V8",
    "share_class_shares_outstanding": 16406400000,
    "sic_code": "3571",
    "sic_description": "ELECTRONIC COMPUTERS",
    "ticker": "AAPL",
    "ticker_root": "AAPL",
    "total_employees": 154000,
    "type": "CS",
    "weighted_shares_outstanding": 16334371000
  },
  "status": "OK"
}


{
  "request_id": "ca3b7d0615e399608f60e45e1555a338",
  "results": {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNAS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "share_class_figi": "BBG001S5N8V8",
    "market_cap": 3009568939000,
    "phone_number": "(408) 996-1010",
    "address": {
      "address1": "ONE APPLE PARK WAY",
      "city": "CUPERTINO",
      "state": "CA",
      "postal_code": "95014"
    },
    "description": "Apple is among the largest companies in the world, with a broad portfolio of hardware and software products targeted at consumers and businesses. Apple's iPhone makes up a majority of the firm sales, and Apple's other products like Mac, iPad, and Watch are designed around the iPhone as the focal point of an expansive software ecosystem. Apple has progressively worked to add new applications, like streaming video, subscription bundles, and augmented reality. The firm designs its own software and semiconductors while working with subcontractors like Foxconn and TSMC to build its products and chips. Slightly less than half of Apple's sales come directly through its flagship stores, with a majority of sales coming indirectly through partnerships and distribution.",
    "sic_code": "3571",
    "sic_description": "ELECTRONIC COMPUTERS",
    "ticker_root": "AAPL",
    "homepage_url": "https://www.apple.com",
    "total_employees": 164000,
    "list_date": "1980-12-12",
    "branding": {
      "logo_url": "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2025-04-04_logo.svg",
      "icon_url": "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2025-04-04_icon.png"
    },
    "weighted_shares_outstanding": 14935826000,
    "round_lot": 100
  },
  "status": "OK"
}


Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Indices/
Aggregate Bars (OHLC)/
Custom Bars (OHLC)
Custom Bars (OHLC)
GET
/v2/aggs/ticker/{indicesTicker}/range/{multiplier}/{timespan}/{from}/{to}
Retrieve aggregated historical OHLC (Open, High, Low, Close) and value data for a specified index over a custom date range and time interval in Eastern Time (ET). Unlike stocks or options, these aggregates are derived from index values rather than individual trades, reflecting the performance of a market segment, sector, or benchmark. If no index updates occur within a given timeframe, no aggregate bar is produced, resulting in an empty interval that indicates a period without new index data. Users can customize their view by adjusting the multiplier and timespan parameters (e.g., a 5-minute interval). This approach supports various analytical and visualization needs related to broad market or sector performance.

Use Cases: Data visualization, market trend analysis, benchmark comparisons, research and modeling.

Path Parameters
Reset values
indicesTicker
string
required
I:NDX
The ticker symbol of Index.
multiplier
integer
required
1
The size of the timespan multiplier.
timespan
enum (string)
required

day
The size of the time window.
from
string
required
2023-03-13
The start of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
to
string
required
2023-03-24
The end of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.
Query Parameters
sort
enum (string)

asc
Sort the results by timestamp. `asc` will return results in ascending order (oldest at the top), `desc` will return results in descending order (newest at the top).
limit
integer
120
Limits the number of base aggregates queried to create the aggregate results. Max 50000 and Default 5000. Read more about how limit is used to calculate aggregate results in our article on Aggregate Data API Improvements.
Response Attributes
ticker
string
The exchange symbol that this item is traded under.
queryCount
integer
The number of aggregates (minute or day) used to generate the response.
request_id
string
A request id assigned by the server.
resultsCount
integer
The total number of results for this request.
status
string
The status of this request's response.
results
array (object)
optional
An array of results containing the requested data.

Hide child attributes
c
number
The close value for the symbol in the given time period.
h
number
The highest value for the symbol in the given time period.
l
number
The lowest value for the symbol in the given time period.
o
number
The open value for the symbol in the given time period.
t
integer
The Unix millisecond timestamp for the start of the aggregate window.
Code Examples

Shell

Python

Go

JavaScript

Kotlin


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

aggs = []
for a in client.list_aggs(
    "I:NDX",
    1,
    "day",
    "2023-03-13",
    "2023-03-24",
    sort="asc",
    limit=120,
):
    aggs.append(a)

print(aggs)
Query URL
GET
https://api.polygon.io/v2/aggs/ticker/I:NDX/range/1/day/2023-03-13/2023-03-24?sort=asc&limit=120&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


{
  "count": 2,
  "queryCount": 2,
  "request_id": "0cf72b6da685bcd386548ffe2895904a",
  "results": [
    {
      "c": 11995.88235998666,
      "h": 12340.44936267155,
      "l": 11970.34221717375,
      "o": 12230.83658266843,
      "t": 1678341600000
    },
    {
      "c": 11830.28178808306,
      "h": 12069.62262033557,
      "l": 11789.85923449393,
      "o": 12001.69552583921,
      "t": 1678428000000
    }
  ],
  "status": "OK",
  "ticker": "I:NDX"
}
Ticker Overview
Previous Day Bar
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Custom Bars (OHLC) | Indices REST API - Polygon

{
  "ticker": "I:NDX",
  "queryCount": 10,
  "results": [
    {
      "o": 11752.09646595808,
      "c": 11923.16717411544,
      "h": 12073.95498873291,
      "l": 11695.41307336048,
      "t": 1678683600000
    },
    {
      "o": 12078.4620669189,
      "c": 12199.78646849645,
      "h": 12217.87144341241,
      "l": 12035.21710547149,
      "t": 1678770000000
    },
    {
      "o": 12083.23910077472,
      "c": 12251.32123450554,
      "h": 12269.44634370725,
      "l": 12026.18070913052,
      "t": 1678856400000
    },
    {
      "o": 12211.86577904491,
      "c": 12581.39017409703,
      "h": 12595.69435164233,
      "l": 12190.65283340424,
      "t": 1678942800000
    },
    {
      "o": 12570.15787449877,
      "c": 12519.87537150916,
      "h": 12674.34349909335,
      "l": 12444.07822780839,
      "t": 1679029200000
    },
    {
      "o": 12487.79404474406,
      "c": 12562.60737888998,
      "h": 12578.34698916301,
      "l": 12407.81647416362,
      "t": 1679288400000
    },
    {
      "o": 12643.34997021695,
      "c": 12741.43723469103,
      "h": 12762.45196580061,
      "l": 12582.76019045262,
      "t": 1679374800000
    },
    {
      "o": 12742.40594188084,
      "c": 12567.15115251514,
      "h": 12943.61752743047,
      "l": 12563.77830607913,
      "t": 1679461200000
    },
    {
      "o": 12735.59559816523,
      "c": 12729.23276479417,
      "h": 12900.10246229279,
      "l": 12611.67217939815,
      "t": 1679547600000
    },
    {
      "o": 12700.50750344015,
      "c": 12767.04752267372,
      "h": 12770.27867280304,
      "l": 12608.15443934004,
      "t": 1679634000000
    }
  ],
  "status": "OK",
  "request_id": "0980b9f9eebd6377b96cc83364f92445",
  "count": 10
}

Polygon.ioPolygon.io Docs Logo


Docs/
REST API/
Economy/
Treasury Yields
Treasury Yields
GET
/fed/v1/treasury-yields
Retrieve historical U.S. Treasury yield data for standard timeframes ranging from 1-month to 30-years, with daily historical records back to 1962. This endpoint lets you query by date or date range to see how interest rates have changed over time. Each data point reflects the market yield for Treasury securities of a specific maturity, helping users understand short- and long-term rate movements.

Use Cases: Charting rate trends, comparing short vs. long-term yields, economic research.

Query Parameters
Reset values
date
string
Calendar date of the yield observation (YYYY‑MM‑DD).

Show filter modifiers
limit
integer
100
Limit the maximum number of results returned. Defaults to '100' if not specified. The maximum allowed limit is '50000'.
sort
string
date.asc
A comma separated list of sort columns. For each column, append '.asc' or '.desc' to specify the sort direction. The sort column defaults to 'date' if not specified. The sort order defaults to 'asc' if not specified.
Response Attributes
next_url
string
optional
If present, this value can be used to fetch the next page.
request_id
string
A request id assigned by the server.
results
array (object)
The results for this request.

Hide child attributes
date
string
optional
Calendar date of the yield observation (YYYY‑MM‑DD).
yield_10_year
number
optional
Market Yield on U.S. Treasury Securities at 10‑Year Constant Maturity, Quoted on an Investment Basis
yield_1_month
number
optional
Market Yield on U.S. Treasury Securities at 1‑Month Constant Maturity, Quoted on an Investment Basis
yield_1_year
number
optional
Market Yield on U.S. Treasury Securities at 1‑Year Constant Maturity, Quoted on an Investment Basis
yield_20_year
number
optional
Market Yield on U.S. Treasury Securities at 20‑Year Constant Maturity, Quoted on an Investment Basis
yield_2_year
number
optional
Market Yield on U.S. Treasury Securities at 2‑Year Constant Maturity, Quoted on an Investment Basis
yield_30_year
number
optional
Market Yield on U.S. Treasury Securities at 30‑Year Constant Maturity, Quoted on an Investment Basis
yield_3_month
number
optional
Market Yield on U.S. Treasury Securities at 3‑Month Constant Maturity, Quoted on an Investment Basis
yield_3_year
number
optional
Market Yield on U.S. Treasury Securities at 3‑Year Constant Maturity, Quoted on an Investment Basis
yield_5_year
number
optional
Market Yield on U.S. Treasury Securities at 5‑Year Constant Maturity, Quoted on an Investment Basis
yield_6_month
number
optional
Market Yield on U.S. Treasury Securities at 6‑Month Constant Maturity, Quoted on an Investment Basis
yield_7_year
number
optional
Market Yield on U.S. Treasury Securities at 7‑Year Constant Maturity, Quoted on an Investment Basis
status
enum (OK)
The status of this request's response.
Code Examples

Shell

Python

Go


from polygon import RESTClient

client = RESTClient("pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43")

yields = []
for date in client.list_treasury_yields(
	limit=100,
	sort="date.asc",
	):
    yields.append(date)

print(yields)
Query URL
GET
https://api.polygon.io/fed/v1/treasury-yields?limit=100&sort=date.asc&apiKey=pnkoTSnYpxNLqJajlEBPXTqKf2nxqO43
Click "Run Query" to view the API response below

Default

Run Query
Scroll to see updated query response
Response Object

Sample Response

Query Response


// Run a query to see a response
Condition Codes
Analyst Details
Did you find this page helpful?

Yes

No
Do you still need help with something?
Knowledge Base
Contact Support
Treasury Yields | REST API - Polygon


{
  "count": 1,
  "request_id": 1,
  "results": [
    {
      "date": "1962-01-02",
      "yield_10_year": 4.06,
      "yield_1_year": 3.22,
      "yield_5_year": 3.88
    }
  ],
  "status": "OK"
}

{
  "status": "OK",
  "request_id": "09f5fb0f88694c2eb49180184c18ebe5",
  "results": [
    {
      "date": "1962-01-02",
      "yield_1_year": 3.22,
      "yield_5_year": 3.88,
      "yield_10_year": 4.06
    },
    {
      "date": "1962-01-03",
      "yield_1_year": 3.24,
      "yield_5_year": 3.87,
      "yield_10_year": 4.03
    },
    {
      "date": "1962-01-04",
      "yield_1_year": 3.24,
      "yield_5_year": 3.86,
      "yield_10_year": 3.99
    },
    {
      "date": "1962-01-05",
      "yield_1_year": 3.26,
      "yield_5_year": 3.89,
      "yield_10_year": 4.02
    },
    {
      "date": "1962-01-08",
      "yield_1_year": 3.31,
      "yield_5_year": 3.91,
      "yield_10_year": 4.03
    },
    {
      "date": "1962-01-09",
      "yield_1_year": 3.32,
      "yield_5_year": 3.93,
      "yield_10_year": 4.05
    },
    {
      "date": "1962-01-10",
      "yield_1_year": 3.33,
      "yield_5_year": 3.94,
      "yield_10_year": 4.07
    },
    {
      "date": "1962-01-11",
      "yield_1_year": 3.33,
      "yield_5_year": 3.94,
      "yield_10_year": 4.08
    },
    {
      "date": "1962-01-12",
      "yield_1_year": 3.3,
      "yield_5_year": 3.95,
      "yield_10_year": 4.08
    },
    {
      "date": "1962-01-15",
      "yield_1_year": 3.32,
      "yield_5_year": 3.96,
      "yield_10_year": 4.1
    },
    {
      "date": "1962-01-16",
      "yield_1_year": 3.3,
      "yield_5_year": 3.98,
      "yield_10_year": 4.13
    },
    {
      "date": "1962-01-17",
      "yield_1_year": 3.3,
      "yield_5_year": 3.97,
      "yield_10_year": 4.12
    },
    {
      "date": "1962-01-18",
      "yield_1_year": 3.27,
      "yield_5_year": 3.96,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-19",
      "yield_1_year": 3.27,
      "yield_5_year": 3.95,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-22",
      "yield_1_year": 3.25,
      "yield_5_year": 3.93,
      "yield_10_year": 4.09
    },
    {
      "date": "1962-01-23",
      "yield_1_year": 3.25,
      "yield_5_year": 3.94,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-24",
      "yield_1_year": 3.24,
      "yield_5_year": 3.93,
      "yield_10_year": 4.1
    },
    {
      "date": "1962-01-25",
      "yield_1_year": 3.27,
      "yield_5_year": 3.94,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-26",
      "yield_1_year": 3.28,
      "yield_5_year": 3.97,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-29",
      "yield_1_year": 3.28,
      "yield_5_year": 3.98,
      "yield_10_year": 4.12
    },
    {
      "date": "1962-01-30",
      "yield_1_year": 3.28,
      "yield_5_year": 3.98,
      "yield_10_year": 4.11
    },
    {
      "date": "1962-01-31",
      "yield_1_year": 3.29,
      "yield_5_year": 3.99,
      "yield_10_year": 4.1
    },
    {
      "date": "1962-02-01",
      "yield_1_year": 3.3,
      "yield_5_year": 4,
      "yield_10_year": 4.09
    },
    {
      "date": "1962-02-02",
      "yield_1_year": 3.3,
      "yield_5_year": 3.97,
      "yield_10_year": 4.08
    },
    {
      "date": "1962-02-05",
      "yield_1_year": 3.29,
      "yield_5_year": 3.96,
      "yield_10_year": 4.07
    },
    {
      "date": "1962-02-06",
      "yield_1_year": 3.29,
      "yield_5_year": 3.96,
      "yield_10_year": 4.06
    },
    {
      "date": "1962-02-07",
      "yield_1_year": 3.29,
      "yield_5_year": 3.95,
      "yield_10_year": 4.07
    },
    {
      "date": "1962-02-08",
      "yield_1_year": 3.3,
      "yield_5_year": 3.93,
      "yield_10_year": 4.07
    },
    {
      "date": "1962-02-09",
      "yield_1_year": 3.28,
      "yield_5_year": 3.91,
      "yield_10_year": 4.05
    },
    {
      "date": "1962-02-13",
      "yield_1_year": 3.28,
      "yield_5_year": 3.91,
      "yield_10_year": 4.03
    },
    {
      "date": "1962-02-14",
      "yield_1_year": 3.31,
      "yield_5_year": 3.9,
      "yield_10_year": 4.03
    },
    {
      "date": "1962-02-15",
      "yield_1_year": 3.33,
      "yield_5_year": 3.9,
      "yield_10_year": 4.02
    },
    {
      "date": "1962-02-16",
      "yield_1_year": 3.33,
      "yield_5_year": 3.88,
      "yield_10_year": 4.02
    },
    {
      "date": "1962-02-19",
      "yield_1_year": 3.32,
      "yield_5_year": 3.86,
      "yield_10_year": 4.01
    },
    {
      "date": "1962-02-20",
      "yield_1_year": 3.31,
      "yield_5_year": 3.88,
      "yield_10_year": 4.05
    },
    {
      "date": "1962-02-21",
      "yield_1_year": 3.28,
      "yield_5_year": 3.86,
      "yield_10_year": 4.03
    },
    {
      "date": "1962-02-23",
      "yield_1_year": 3.24,
      "yield_5_year": 3.83,
      "yield_10_year": 4.02
    },
    {
      "date": "1962-02-26",
      "yield_1_year": 3.22,
      "yield_5_year": 3.8,
      "yield_10_year": 4
    },
    {
      "date": "1962-02-27",
      "yield_1_year": 3.23,
      "yield_5_year": 3.8,
      "yield_10_year": 4.01
    },
    {
      "date": "1962-02-28",
      "yield_1_year": 3.21,
      "yield_5_year": 3.77,
      "yield_10_year": 4
    },
    {
      "date": "1962-03-01",
      "yield_1_year": 3.15,
      "yield_5_year": 3.71,
      "yield_10_year": 3.98
    },
    {
      "date": "1962-03-02",
      "yield_1_year": 3.17,
      "yield_5_year": 3.72,
      "yield_10_year": 3.98
    },
    {
      "date": "1962-03-05",
      "yield_1_year": 3.18,
      "yield_5_year": 3.74,
      "yield_10_year": 4
    },
    {
      "date": "1962-03-06",
      "yield_1_year": 3.18,
      "yield_5_year": 3.74,
      "yield_10_year": 4.01
    },
    {
      "date": "1962-03-07",
      "yield_1_year": 3.14,
      "yield_5_year": 3.74,
      "yield_10_year": 4
    },
    {
      "date": "1962-03-08",
      "yield_1_year": 3.11,
      "yield_5_year": 3.72,
      "yield_10_year": 3.98
    },
    {
      "date": "1962-03-09",
      "yield_1_year": 3.12,
      "yield_5_year": 3.71,
      "yield_10_year": 3.96
    },
    {
      "date": "1962-03-12",
      "yield_1_year": 3.13,
      "yield_5_year": 3.73,
      "yield_10_year": 3.94
    },
    {
      "date": "1962-03-13",
      "yield_1_year": 3.11,
      "yield_5_year": 3.7,
      "yield_10_year": 3.92
    },
    {
      "date": "1962-03-14",
      "yield_1_year": 3.1,
      "yield_5_year": 3.72,
      "yield_10_year": 3.93
    }
  ],
  "next_url": "https://api.polygon.io/fed/v1/treasury-yields?cursor=AAEAAQFkAAEBDQoxOTYyLTA1LTI0"
}