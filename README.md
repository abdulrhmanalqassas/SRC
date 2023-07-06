# Verification-System-Powered-by-Blockchain

## This software system will be a web app powered by Blockchain 

Build a Restful api for products varification system. 
this software make it easily for all users around the world to varify if the current product on their hand is fake or not 
this simplicity is coming out of block chain mechanism.

every user can simply scan the product barcode, our system is going to check whether this product is related to the his specific brand or not (fake or not).

## SERVER 


### Storage : 
We'll use a relational database (schema follows) to fast retrieval of the URL reports . A minimal database implementation such as sqlite using SQLAlchemy ORM suffices, although we can potentially switch to something with a little more power such as PostgreSql if necessary. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage.

### Server : 
A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Python3 is selected for implementing the server . 
- Flask is the web server framework.
- Ethereum blockchain nodes.
- Web3 instance represents a connection to an Ethereum node using websockets API

### Why Ethereum?
**NFTs** :
```
NFTs, or Non-Fungible Tokens, are a type of digital asset that represent ownership of a unique item or piece of content, such as a piece of artwork, a music file, or a collectible

``` 
yeh, you may got it now, that is excatly what we want, the same idea we use in our system **the ownership of products** 
so, it is preffered to use the same technology that NFTs uses, which is Ethereum. 
that is simply why we use Ethereum here.


### Auth : 
for v1 , a simple JWT-based auth mechanism is to be used (ACCESS and REFRESH token), with passwords encrypted and stored in the database. OAuth is to be added initially or later for Google + Facebook . 


### API : 

 **Auth** :
 ``` 
/v1/auth/signIn                      [POST] 
/v1/auth/signUp                      [POST]
/v1/auth/forgot-password             [POST]
/v1/auth/reset-password              [POST]
```

**addProduct** : 

```
/v1/blockchain/create_contract                   [POST] 
/v1/blockchain/verify-contract                   [POST] 
```






