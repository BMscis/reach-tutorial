# NFTea-Auction
This is a repo to work with, upload and Auction NFTs smart contracts using the svelte framework and Reach.
Web 3 NFT Market Place with **Reach** and **Svelte**.


## Prerequisites

Please install or have installed the following:

- [nodejs and npm](https://nodejs.org/en/download/)
- [Reach](https://docs.reach.sh/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS S3](https://aws.amazon.com/s3/)

## Installation

## Install Reach

Reach is designed to work on POSIX systems with [make](https://en.wikipedia.org/wiki/Make_(software)), [Docker](https://www.docker.com/get-started), and [Docker Compose](https://docs.docker.com/compose/install/) installed. The best way to install Docker on Mac and Windows is with [Docker Desktop](https://www.docker.com/products/docker-desktop).


To confirm everything is installed try to run the following three commands and see no errors

``` bash
$ make --version
$ docker --version
$ docker-compose --version
```

If you’re using Windows, consult [the guide to using Reach on Windows](https://docs.reach.sh/guide-windows.html).

Once you've confirmed that the Reach prerequisites are installed, choose a directory for this project such as:

``` bash
$ mkdir -p ~/reach && cd ~/reach
```

## Clone the Reach Auction demo application

Clone the repository using the following commands.

```bash
git clone https://github.com/BMscis/reach-tutorial.git

```

Navigate to the project folder

``` bash
cd reach-tutorial
```

Next, download Reach by running

``` bash
$ curl https://docs.reach.sh/reach -o reach ; chmod +x reach
```

Confirm the download worked by running

``` bash
$ ./reach version
```

Since Reach is Dockerized, when first used, the images it uses need to be downloaded. This will happen automatically when used for the first time, but can be done manually now by running

``` bash
$ ./reach update
```

You’ll know that everything is in order if you can run

``` bash
$ ./reach compile --help
```
# Install nodejs and npm

Navigate to [npm installation guide]( https://nodejs.org/en/download/.)

To verify Open a command prompt (or PowerShell), and enter the following:

``` bash
$ node -v
```
``` bash
$ npm -v
```

## Start
1. Start Reach with connector mode. Either *ETH* or *ALGO*.
```shell
REACH_CONNECTOR_MODE=ALGO ./reach react
```
>or...
```shell
REACH_CONNECTOR_MODE=ETH ./reach react
```
2. For the quick tutorial make sure you have **Metamask** and **MYALGOCONNECT SDK**.
>To download MYALGOCONNECT SDK

3. Start the Svelte project
```shel
CD into the svelte-project

Run npm install

Run npm run dev
````
To start the application

You will need testnet ALGO To upload your nft for auction. You can find faucets in the [Algo Explorer](https://testnet.algoexplorer.io/dispenser). 

# Verify on Algo Explorer

The contract can be verified if you just set your `TX ID`. 


# Viewing on NFTea
After uploading the nft give it some minutes and it pops-up on the latest section where buyers can view and bid for nfts.


## Resources

To get started with Svelte and Reach:


