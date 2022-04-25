import { writable } from 'svelte/store'
const screenCardRatio = 0.55
export const windowSize = writable({ width: 0, height: 0, isLarge: 0 })
export const topContainer = writable({
    topBar: { width: 0, height: 0, isLarge: 0 },
    menuBlock: { width: 0, height: 0, isLarge: 0 },
    anchorBlock: { width: 0, height: 0, isLarge: 0 }
  })
export const mainGridTemplate = writable(
    {gridDirection:"columns",
    gridColumns:3,
    style:"",
    sideBarVisible: true,
    centralBlockPosition:3,
    nftBlockWidth:0,
    nftBlockHeight:0,
}
)
export const centralBlock = writable({
    style:'',
    opacity:false,
    height: 0
})
export const rightBlock = writable({
    style:'',
    opacity:false,
    height : 0
})
export const sideBar = writable({
    height:0
})
export const featureBlock = writable({
    upperRightBlock: { width: 0, height: 0, isLarge: 0 },
    bodyTitle: { width: 0, height: 0, isLarge: 0 },
    imageBlock: { width: 0, height: 0, isLarge: 0 },
    imageHeaderContainer: { width: 0, height: 0, isLarge: 0 }
  })
export const SetWindowSize = (() => {
    const { subscribe, set } = windowSize
    function action(node, binding) {
        function validate(value) {
            const vW = value[0]
            const vH = value[1]
            const [gridDirection,gridColumns] = MainGridDisplay(vW,vH)
            setMainGridTemplate(gridDirection,gridColumns,vW,vH)
            setTopContainer(vW,vH)
            setCentralBlock(gridDirection,gridColumns,vW,vH)
            setRightBlock(gridDirection,gridColumns,vW,vH)
            setSidebar(vH)
            set({ width: vW, height: vH, isLarge: vW > 732 })

            return
        }
        validate([window.innerWidth, window.innerHeight])

        return {
            update(value) {
                validate(value, true)
            }
        }
    }
    return [{ subscribe }, action]
})
const fittingScreen = ((width, height) => {
    let ratio = (width / height).toFixed(2)
    let fittingScreens = Math.floor(ratio / screenCardRatio)
    return fittingScreens
})
const MainGridDisplay = ((width, height) => {
    let mainFitting = fittingScreen(width, height)
    mainFitting == 0 ? mainFitting = 1 : mainFitting = mainFitting
    return mainFitting > 1 ? ["columns", mainFitting] : ["rows", 1]
})
const blockSize = ((num, by) => { return (num * by).toFixed(2) })
const gridSizePx = ((columnNumber,widthPx,heightPx) => {
    let gridLeft = 300
    let gridCenter
    let gridRight
    let sideVisible = true
    let centerBlockStart = 2
    let leftThirds = blockSize(widthPx,0.23)
    let rightThirds = blockSize(widthPx,0.43)
    let thirds = blockSize(widthPx,0.33)
    let halves = blockSize(widthPx,0.5)
    let singles = blockSize(heightPx,0.9)
    switch (columnNumber) {
        case 3:
            gridLeft = leftThirds
            gridCenter = columnNumber > 2 ? thirds : 0
            gridRight = rightThirds
            break;
        case 2:
            sideVisible = false
            gridLeft = 0
            gridCenter  = halves
            gridLeft = halves
            centerBlockStart = 1
            break;
    
        case 1:
            sideVisible = false
            gridLeft = 0
            gridCenter = gridCenter  = singles
            gridRight = gridCenter  = singles
            centerBlockStart = 1
            break;
        default:
            gridLeft = leftThirds
            gridCenter = columnNumber > 2 ? thirds : 0
            gridRight = rightThirds
            break;
    }
    return [gridLeft,gridCenter,gridRight,sideVisible,centerBlockStart]
})
const setMainGridTemplate = ((gridDirection, gridColumns,vW,vH) => {
    const [gridLeft,gridCenter,gridright,sideIsVisible,cBlockStart] = gridSizePx(gridColumns,vW,vH)
    switch (gridDirection) {
        case "columns":
            mainGridTemplate.set({
                gridDirection: gridDirection,
                gridColumns: gridColumns,
                style: `grid-template-rows:100%;
                        grid-template-columns: ${gridLeft}px ${gridCenter}px ${gridright}px;
                       `,
                sideBarVisible:sideIsVisible,
                centralBlockPosition:cBlockStart,
                nftBlockWidth: blockSize(vW, 0.5),
                nftBlockHeight: blockSize(vH, 0.75)
            })
            break;
        case "rows":
            mainGridTemplate.set({
                gridDirection: gridDirection,
                gridColumns: gridColumns,
                style: `grid-template-columns:100%;
                        grid-template-rows: ${gridright}px;
                        height:${blockSize(vH,0.9)}px;
                        `,
                sideBarVisible:sideIsVisible,
                centralBlockPosition:cBlockStart,
                nftBlockWidth: blockSize(vW, 0.8),
                nftBlockHeight: blockSize(vH, 0.75)
            })
            break;
    
        default:
            break;
    }
})
const setCentralBlock = ((gridDirection, gridColumns,vW,vH) => {
    let style
    let height
    let opacity
    switch (gridDirection) {
        case "columns":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-column-start:${gridColumns - 1};
            `
            opacity = false
            height = blockSize(vH,0.9)
            break;
        case "rows":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-row-start:1;
            grid-column-start: 1;
            `
            opacity = true
            height = blockSize(vH,0.9)
            break;
    }
    centralBlock.set({
        style:style,
        opacity:opacity,
        height:parseFloat(height)
    })
})
const setTopContainer = ((width,height) => {
    topContainer.set(
      {
        topBar: { width: width, height: blockSize(height, 0.1), isLarge: width > 732 },
        menuBlock: { width: blockSize(width, 0.2), height: blockSize(height, 0.1), isLarge: width > 732 },
        anchorBlock: { width: blockSize(width, 0.6), height: blockSize(height, 0.1), isLarge: width > 732 }
      }
    )
})
const setRightBlock = ((gridDirection, gridColumns,vW,vH) => {
    let style
    let height = 0
    let opacity = false
    switch (gridDirection) {
        case "columns":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-column-start:${gridColumns};
            `
            height = blockSize(vH,0.9)
            break;
        case "rows":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-row-start:1;
            grid-column-start: 1;
            `
            opacity = true
            height = blockSize(vH,0.9)
            break;
    }
    rightBlock.set({
        style:style,
        opacity:opacity,
        height:parseFloat(height)
    })
})
const setSidebar = ((vH) => {
    sideBar.set({height: blockSize(vH,0.9)})
})
const setfeatureBlock = ((width,height) => {
    let blockWidth
    let blockHeight
    switch ((width / height).toFixed(2) >= 1) {
      case true:
        blockWidth = blockSize(width, 0.57)
        blockHeight = blockSize(height, 0.5)
        break;
      case false:
        blockWidth = blockSize(width, 0.90)
        blockHeight = blockSize(height, 0.55)
        break;
    }
    featureBlock.set(
      {
        upperRightBlock: {
          width: blockWidth,
          height: blockHeight,
          isLarge: width > 732
        },
        bodyTitle: {
          width: blockSize(blockWidth, 0.26),
          height: blockSize(blockHeight, 0.15),
          isLarge: width > 732
        },
        imageBlock: {
          width: blockSize(blockWidth, 0.95),
          height: blockSize(blockHeight, 0.95),
          isLarge: width > 732
        },
        imageHeaderContainer: {
          width: blockWidth,
          height: blockSize(blockHeight, 0.18),
          isLarge: width > 732
        }
      }
    )
  })