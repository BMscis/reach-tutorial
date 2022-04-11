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
}
)
export const centralBlock = writable({
    style:'',
    opacity:false
})
export const rightBlock = writable({
    style:'',
    opacity:false
})
export const sideBar = writable({
    height:0
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
const cardDisplay = ((width, height) => {
    let cardRatioCheck = fittingScreen(width, height)
    cardRatioCheck > screenCardRatio ? width = height * 0.55 : width = width
    return [width, height]
})
const blockSize = ((num, by) => { return (num * by).toFixed(2) })
const gridSizePx = ((columnNumber,widthPx,heightPx) => {
    let gridLeft = 300
    let gridCenter
    let gridRight
    let sideVisible = true
    let centerBlockStart = 2
    let thirds = blockSize(widthPx,0.33)
    let halves = blockSize(widthPx,0.5)
    let singles = blockSize(heightPx,0.9)
    switch (columnNumber) {
        case 3:
            gridLeft = columnNumber > 2 ? thirds : 0
            gridCenter = columnNumber > 2 ? thirds : 0
            gridRight = columnNumber > 2 ? thirds: 0
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
            gridLeft = columnNumber > 2 ? thirds : 0
            gridCenter = columnNumber > 2 ? thirds : 0
            gridRight = columnNumber > 2 ? thirds: 0
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
            })
            break;
        case "rows":
            mainGridTemplate.set({
                gridDirection: gridDirection,
                gridColumns: gridColumns,
                style: `grid-template-columns:100%;
                        grid-template-rows: ${gridLeft}px ${gridCenter}px ${gridright}px;
                        `,
                sideBarVisible:sideIsVisible,
                centralBlockPosition:cBlockStart,
            })
            break;
    
        default:
            break;
    }
})
const setCentralBlock = ((gridDirection, gridColumns,vW,vH) => {
    let style
    let opacity
    switch (gridDirection) {
        case "columns":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-column-start:${gridColumns - 1};
            `
            opacity = false
            break;
        case "rows":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-row-start:2;
            grid-column-start: 1;
            `
            opacity = true
            break;
    }
    centralBlock.set({
        style:style,
        opacity:opacity
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
    let opacity = false
    switch (gridDirection) {
        case "columns":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-column-start:${gridColumns};
            `
            break;
        case "rows":
            style = `
            height:${blockSize(vH,0.9)}px;
            grid-row-start:2;
            grid-column-start: 1;
            `
            opacity = true
            break;
    }
    rightBlock.set({
        style:style,
        opacity:opacity
    })
})
const setSidebar = ((vH) => {
    sideBar.set({height: blockSize(vH,0.9)})
})