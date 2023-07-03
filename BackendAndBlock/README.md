
# **Install all requirements for the project** 
```
pip install -r req.txt
```
> 📝 make sure that you are on the path that the req.txt file exists.

<br/>


## **Install enviroment** 
```
pip install virtualenv
```
## **Make another inviroment**
> 📝 you can skip this step and use the existing env folder

<br/>

```
virtualenv venv
```
### **Activate the enviroment** 

**in windows**
``` 
venv\Scripts\activate.bat
```
**in linux**
```
source env/Scripts/activate
```
<br/>

# I have deprecated packages:  
```
pywin32==304 as i am using WSL which is not nessery for this kind of system, still don't know if it is going to affect the software or not, but we see.
**NOTE** you may need to add pywin32==304 into req.txt if you uses Windows OS
```

### if you are using vs code or any other editors/IDE 
if you face annotation saying *Import **package name** could not be resolvedPylancereportMissingImports*
you may need to re-install it or install the requirements again - *the first step-* 

<br/>

# RUN BlockChain 

## Truffle
```
npm install -g truffle
```
and test by 
```
truffle version
```


<br/>

## ganache-cli 
``` 
npm install -g ganache-cli
OR 
npm install ganache --global
```
after that type 
``` 
ganache
```
it will open a connection on port 8545
> 📝 make sure that **npm ^v14** and **git** installed
<br/>

> 📝 try to aviod ganache ui, it doesn't work for me 

<br/>

# Start writing your first cotract 

**STEP 1** 
```
truffle unbox metacoin

```
**STEP 2**
```
write your first contract 
```
**STEP3** 
```
truflle compile 
```
take the name of your contract and add it in `1_deploy_contracts.js` file <br>
ex :   `deployer.deploy(myContract);` then : go to `truffle-config.js` and uncomment these lines <br>
```   
development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
```
**LAST STEP**
###  the following should be run after running the ganache netword above 
```
truffle migrate 
```
this command is responsible for deploying your contract to the ethereum node 

<br/>

# DATABASE SCHEMA 

**Users** 
| Column | Type |
|--------|------|
| Id     | STRING /UUID |
| IdCode     | STRING /UUID |
| First/Last Name | STRING |
| Passwords | STRING | 
| E-mail | STRING |
| contract_address | STRING |
| UserName | STRING |
| user_role | STRING | 




 
