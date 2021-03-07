//create a global variable that will point to the tooltip in the DOM
var tipObj = null

//offset along x and y in px
var offset = {
  x: 20,
  y: 20,
}

/********************************************************************
 * injectTooltip(e,data)
 * inject the custom tooltip into the DOM
 ********************************************************************/
function injectTooltip(event, name, area) {
  if (!tipObj && event) {
    //create the tooltip object
    tipObj = document.createElement('div')
    tipObj.style.width = '100px'
    tipObj.style.height = '40px'
    tipObj.style.background = 'white'
    tipObj.style.borderRadius = '5px'
    tipObj.style.padding = '10px'
    tipObj.style.fontFamily = 'Arial,Helvetica'
    tipObj.style.textAlign = 'center'
    tipObj.innerHTML = name + '<br /><b>' + area + '</b>' + ' acres'

    //position it
    tipObj.style.position = 'fixed'
    tipObj.style.top = event.domEvent.clientY + window.scrollY + offset.y + 'px'
    tipObj.style.left =
      event.domEvent.clientX + window.scrollX + offset.x + 'px'

    //add it to the body
    document.body.appendChild(tipObj)
  }
}

/********************************************************************
 * moveTooltip(e)
 * update the position of the tooltip based on the event data
 ********************************************************************/
function moveTooltip(event) {
  if (tipObj && event) {
    //position it
    tipObj.style.top = event.domEvent.clientY + window.scrollY + offset.y + 'px'
    tipObj.style.left =
      event.domEvent.clientX + window.scrollX + offset.x + 'px'
  }
}

/********************************************************************
 * deleteTooltip(e)
 * delete the tooltip if it exists in the DOM
 ********************************************************************/
function deleteTooltip(event) {
  if (tipObj) {
    //delete the tooltip if it exists in the DOM
    document.body.removeChild(tipObj)
    tipObj = null
  }
}

export { injectTooltip, moveTooltip, deleteTooltip }
