import { writable} from 'svelte/store'

const topMargin = 40
export const isMobile = writable({isMob:false})
export const windowSize = writable({width:0,height:0,isLarge:0})
export const topContainer = writable({
    topBar: {width:0,height:0,isLarge:0},
    menuBlock: {width:0,height:0,isLarge:0},
    anchorBlock: {width:0,height:0,isLarge:0}
})
export const upperLeftContainer = writable({
    upperLeftBlock: {width:0,height:0,isLarge:0,top:0},
    bidBox: {width:0,height:0,isLarge:0},
    bodyNav: {width:0,height:0,isLarge:0},
    nftCard: {width:0,height:0,isLarge:0}
})
export const upperRightContainer = writable({
    upperRightBlock: {width:0,height:0,isLarge:0},
    bodyTitle: {width:0,height:0,isLarge:0},
    imageBlock: {width:0,height:0,isLarge:0},
    imageHeaderContainer: {width:0,height:0,isLarge:0}
})
export const bottomContainer = writable({
  bottomBlock: {width:0,height:0,isLarge:0},
  bodyNav: {width:0,height:0,isLarge:0},
  nftList: {width:0,height:0,isLarge:0},
  nftListContainer: {width:0,height:0,isLarge:0},
  nftCard: {width:0,height:0,isLarge:0}
})
export const sideBarContainer = writable({
  sidebarBlock: {width:0,height:0,isLarge:0,top:0},
  sidebar: {width:0,height:0,isLarge:0},
  contactBar: {width:0,height:0,isLarge:0},
  menuBarContainer: {width:0,height:0,isLarge:0},
})
export const setMain = writable({
  left:0,
  center:0,
  right:0
})
export const SetWindowSize = (() =>{
    const {subscribe,set} = windowSize
    function action(node, binding) {
        function validate(value) {
            set({width:value[0],height:value[1],isLarge:value[0] > 732})
            setMainGrid(value)
            setTopContainer(value)
            setupperLeftContainer(value)
            setupperRightContainer(value)
            setupBottomContainer(value)
            setupSidebarContainer(value)
          return
        }
        validate([window.innerWidth,window.innerHeight])
    
        return {
          update(value) {
            validate(value,true)
          }
        }
      }
    return [{subscribe},action]
})
const setTopContainer = ((value) => {
  topContainer.set(
    {
      topBar: {width:value[0],height:blockSize(value[1],0.1),isLarge:value[0] > 732},
      menuBlock: {width:blockSize(value[0],0.2),height:blockSize(value[1],0.1),isLarge:value[0] > 732},
      anchorBlock: {width:blockSize(value[0],0.6),height:blockSize(value[1],0.1),isLarge:value[0] > 732}
    }
  )
})
const setupperLeftContainer = ((value) => {
  let blockWidth
  let blockHeight
  switch ((value[0]/value[1].toFixed(2)) >= 1) {
    case true:
      blockWidth = blockSize(value[0],0.33)
      blockHeight = blockSize(value[1],0.80)
      break;
    case false:
      blockWidth = blockSize(value[0],0.90)
      blockHeight = blockSize(value[1],0.80)
      break;
  }
  upperLeftContainer.set(
    {
      upperLeftBlock: {
        width:blockWidth,
        height:blockHeight,
        isLarge:value[0] > 732,
        top:value[1] - blockHeight
      },
      bidBox: {
        width:blockSize(blockWidth,0.9),
        height:blockSize(blockHeight,0.87),
        isLarge:value[0] > 732
      },
      bodyNav: {
        width:blockSize(blockWidth,0.9),
        height:blockSize(blockHeight,0.07),
        isLarge:
        value[0] > 732
      },
      nftCard: {
        width:blockSize(blockWidth,0.5),
        height:blockSize(blockHeight,0.68),
        isLarge:value[0] > 732}
    }
  )
})
const setupperRightContainer = ((value) => {
  let blockWidth
  let blockHeight
  switch ((value[0]/value[1]).toFixed(2) >= 1) {
    case true:
      blockWidth = blockSize(value[0],0.57)
      blockHeight = blockSize(value[1],0.5)
      break;
    case false:
      blockWidth = blockSize(value[0],0.90)
      blockHeight = blockSize(value[1],0.55)
      break;
  }
  upperRightContainer.set(
    {
      upperRightBlock: {
        width:blockWidth,
        height:blockHeight,
        isLarge:value[0] > 732
      },
      bodyTitle: {
        width:blockSize(blockWidth,0.26),
        height:blockSize(blockHeight,0.15),
        isLarge:value[0] > 732
      },
      imageBlock: {
        width:blockSize(blockWidth,0.95),
        height:blockSize(blockHeight,0.95),
        isLarge:value[0] > 732
      },
      imageHeaderContainer: {
        width:blockWidth,
        height:blockSize(blockHeight,0.18),
        isLarge:value[0] > 732
      }
    }
  )
})
const setupBottomContainer = ((value) => {
  let nftWidth
  let blockWidth
  let blockHeight
  let fullBlockWidth
  let alterVal = NFTwindowRatio(value[0],value[1])

  switch ((value[0]/value[1]).toFixed(2) >= 1) {
    case true:
      fullBlockWidth = value[0] - 300 - blockSize(value[0],0.33)
      blockWidth = blockSize(alterVal[0],0.57)
      blockHeight = blockSize(alterVal[1],0.80)
      nftWidth = alterVal[0]
      break;
    case false:
      fullBlockWidth = blockSize(alterVal[0],0.90)
      blockWidth = blockSize(alterVal[0],0.90)
      blockHeight = blockSize(alterVal[1],0.80)
      nftWidth = blockSize(blockWidth,0.8)
      break;
  }
  bottomContainer.set(
    {
      bottomBlock: {
        width:fullBlockWidth,
        height:blockHeight,
        isLarge:value[0] > 750
      },
      bodyNav: {
        width: blockSize(blockWidth,0.95),
        height:blockSize(blockHeight,0.13),
        isLarge:value[0] > 732
      },
      nftList: {
        width: blockSize(blockWidth,0.95),
        height:blockSize(blockHeight,0.87),
        isLarge:value[0] > 732
      },
      nftListContainer: {
        width: nftWidth,
        height:blockSize(blockHeight,0.84),
        isLarge:value[0] > 732
      },
      nftCard: {
        width: nftWidth,
        height:blockSize(blockHeight,0.6),
        isLarge:value[0] > 732
      }
    }
  )
})
const setupSidebarContainer = ((value) => {
  let blockWidth
  let blockHeight
  switch ((value[0]/value[1]).toFixed(2) >= 0.7) {
    case true:
      blockWidth = 300
      blockHeight = blockSize(value[1],0.80)
      break;
    case false:
      blockWidth = blockSize(value[0],0.96)
      blockHeight = blockSize(value[1],0.80)
      break;
  }
  sideBarContainer.set(
    {
      sidebarBlock: {
        width:blockWidth,
        height:blockHeight,
        isLarge:value[0] > 750,
        top:value[1] - blockHeight
      },
      sidebar: {
        width: blockSize(blockWidth,0.84),
        height:blockHeight,
        isLarge:value[0] > 732
      },
      contactBar: {
        width: blockSize(blockWidth,0.84),
        height:blockSize(blockHeight,0.23),
        isLarge:value[0] > 732
      },
      menuBarContainer: {
        width: blockSize(blockWidth,0.84),
        height:blockSize(blockHeight,0.78),
        isLarge:value[0] > 732
      }
    }
  )
})
const setMainGrid = ((value) => {
  let left
  let right
  let center
  switch ((value[0]/value[1]).toFixed(2) >= 1) {
    case true:
      left=300
      center = value[0] - 300 - blockSize(value[0],0.33)
      right = blockSize(value[0],0.33)
      break;
    case false:
      left= blockSize(value[0],0.96)
      center = blockSize(value[0],0.96)
      right = blockSize(value[0],0.96)
      break;
  }
  setMain.set(
    {
      left:left,
      center:center,
      right:right
    }
  )
})
const blockSize = ((num,by) => {return (num * by).toFixed(2) })
const NFTwindowRatio = ((width,height) => {
  let ratio = width/250
  //console.log("RATIO ",ratio)
  //console.log("RATIO ",ratio > 2)
  ratio >= 2 ? width = 375 : width = width
  //console.log(width,height)
  return [width,height]
})