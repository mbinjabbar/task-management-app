import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../app/themeSlice"

export default function ThemeToggleButton() {
  const {mode} = useSelector(state => state.theme)
  const dispatch = useDispatch();

  return (
    <Button onClick={()=> dispatch(toggleTheme())} className='ms-3 px-3 rounded-pill border-2' 
    variant={mode === 'dark' ? 'outline-warning' : 'outline-dark'}>
    <FontAwesomeIcon icon={ mode === 'dark' ? 'sun' : 'moon'}/></Button>
  )
}
