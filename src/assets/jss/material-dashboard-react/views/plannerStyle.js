import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from 'assets/jss/material-dashboard-react.js'

const plannerStyle = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cropListContainer: {
    padding: '12px',
    marginBottom: '6px',
    border: '2px solid black',
    borderRadius: '10px',
  },
  cropListHeader: {
    fontWeight: 'bold',
  },
  cropOptionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  cropListOption: {
    display: 'flex',
    background: 'white',
    padding: '0 12px',
    height: '30px',
    alignItems: 'center',
    margin: '6px 12px',
    border: '1px dashed grey',
    borderRadius: '10px',
    width: 'fit-content',
  },
  button: {
    width: '100%',
    marginBottom: '20px',
  },
  textField: {
    margin: '6px 0',
  },
  selectFieldLabel: {
    fontSize: '12px',
    marginTop: '6px',
  },
  selectField: {
    width: '100%',
  },
}

export default plannerStyle
