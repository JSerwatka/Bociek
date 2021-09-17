import { useRef, useEffect } from "react/cjs/react.development";

import PropTypes from 'prop-types'

import "./DataTypeIcons.css"


function DataTypeIcons({handleDataTypeChange, dataType}) {
    const icons = useRef()

    function selectIcon() {
        icons.current.childNodes.forEach(element => {
            if (element.name === dataType) {
                element.classList.add('selected')
            }
            else {
                element.classList.remove('selected');
            }
        })
    }
    
    useEffect(selectIcon, [dataType])
    
    const handleIconClick = (e) => handleDataTypeChange(e.target.name);
    
    return ( 
        <div className="data-type-wrapper" ref={ icons }>
            <img name="temp" 
                 title="air temperature"
                 onClick={ handleIconClick } 
                 className="data-type-icon" 
                 src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTExLjk4IDUxMS45OCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTEuOTggNTExLjk4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnIGZpbGw9IiM0ZjY2N2EiPjxwYXRoIGQ9Im0zMTUuNDk0IDYxLjA2aDc1Ljc3NGM0LjE0MyAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1Ny03LjUtNy41LTcuNWgtNzUuNzc0Yy00LjE0MyAwLTcuNSAzLjM1OC03LjUgNy41czMuMzU4IDcuNSA3LjUgNy41eiIvPjxwYXRoIGQ9Im0zMTUuNDk0IDk1LjY4OWgzNy44ODdjNC4xNDMgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTM3Ljg4N2MtNC4xNDMgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1OCA3LjUgNy41IDcuNXoiLz48cGF0aCBkPSJtMzkxLjI2OSAxMTUuNjg5aC03NS43NzRjLTQuMTQzIDAtNy41IDMuMzU4LTcuNSA3LjVzMy4zNTcgNy41IDcuNSA3LjVoNzUuNzc0YzQuMTQzIDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU4LTcuNS03LjUtNy41eiIvPjxwYXRoIGQ9Im0zMTUuNDk0IDE2NS4zMThoMzcuODg3YzQuMTQzIDAgNy41LTMuMzU4IDcuNS03LjVzLTMuMzU3LTcuNS03LjUtNy41aC0zNy44ODdjLTQuMTQzIDAtNy41IDMuMzU4LTcuNSA3LjVzMy4zNTggNy41IDcuNSA3LjV6Ii8+PHBhdGggZD0ibTM5MS4yNjkgMTg0LjgwM2gtNzUuNzc0Yy00LjE0MyAwLTcuNSAzLjM1OC03LjUgNy41czMuMzU3IDcuNSA3LjUgNy41aDc1Ljc3NGM0LjE0MyAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1OC03LjUtNy41LTcuNXoiLz48cGF0aCBkPSJtMzE1LjQ5NCAyMzQuNDMyaDM3Ljg4N2M0LjE0MyAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1Ny03LjUtNy41LTcuNWgtMzcuODg3Yy00LjE0MyAwLTcuNSAzLjM1OC03LjUgNy41czMuMzU4IDcuNSA3LjUgNy41eiIvPjxwYXRoIGQ9Im0zOTEuMjY5IDI1NC41NjloLTc1Ljc3NGMtNC4xNDMgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1NyA3LjUgNy41IDcuNWg3NS43NzRjNC4xNDMgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjV6Ii8+PHBhdGggZD0ibTM1My4zODEgMjg5LjE5OGgtMzcuODg3Yy00LjE0MyAwLTcuNSAzLjM1OC03LjUgNy41czMuMzU3IDcuNSA3LjUgNy41aDM3Ljg4N2M0LjE0MyAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1Ny03LjUtNy41LTcuNXoiLz48L2c+PHBhdGggZD0ibTMyNi43NDEgNDA1LjIyYzAgMjguOC0xMS4zIDU1Ljc5LTMxLjggNzYuMDItMjAuMTQgMTkuODYtNDYuNyAzMC43NC03NC45NSAzMC43NC0uNTEgMC0xLjAyIDAtMS41My0uMDEtNC41Mi0uMDctOC45OS0uNDEtMTMuNDEtMS4wNC0yMi41OC0zLjE4LTQzLjU2LTEzLjU0LTYwLjExLTI5LjkzLTE5Ljc4LTE5LjU4LTMxLjA0LTQ1LjU4LTMxLjctNzMuMTktLjg5LTM3LjQyIDE3Ljg4LTcyLjQ5IDQ5LjI0LTkyLjU2di0yNTcuNzVjMC0yNi41MiAxOC4wNC00OC45IDQyLjUtNTUuNTEgNC43OC0xLjMgOS44MS0xLjk5IDE1LTEuOTkgMzEuNyAwIDU3LjUgMjUuNzkgNTcuNSA1Ny41djI1Ny43NWMzMC40OSAxOS41NCA0OS4yNiA1My42MSA0OS4yNiA4OS45N3oiIGZpbGw9IiNlOWY1ZmYiLz48cGF0aCBkPSJtMzI2Ljc0MSA0MDUuMjJjMCAyOC44LTExLjMgNTUuNzktMzEuOCA3Ni4wMi0yMC4xNCAxOS44Ni00Ni43IDMwLjc0LTc0Ljk1IDMwLjc0LTE4LjY5IDAtMzAgMC0zMCAwIDUuMDggMCAxMC4xMS0uMzUgMTUuMDYtMS4wNSAyMi41NC0zLjE2IDQzLjM4LTEzLjQgNTkuODktMjkuNjkgMjAuNTEtMjAuMjMgMzEuOC00Ny4yMiAzMS44LTc2LjAyIDAtMzYuMzYtMTguNzctNDAuMjUtNDkuMjYtNTkuNzl2LTI4Ny45M2MwLTI2LjUyLTE4LjA1LTQ4LjktNDIuNS01NS41MSA0Ljc4LTEuMyA5LjgxLTEuOTkgMTUtMS45OSAzMS43IDAgNTcuNSAyNS43OSA1Ny41IDU3LjV2MjU3Ljc1YzMwLjQ5IDE5LjU0IDQ5LjI2IDUzLjYxIDQ5LjI2IDg5Ljk3eiIgZmlsbD0iI2NkZWFmNyIvPjxnPjxwYXRoIGQ9Im0yOTYuNzQxIDQwNS4zN2MwIDIwLjctOC4xMiA0MC4xMS0yMi44NyA1NC42NS0xNC40NyAxNC4yOC0zMy42MSAyMi4xMS01My45NiAyMi4xMS0uMzUgMC0uNjkgMC0xLjAzLS4wMS0zLjg0LS4wNS03LjY0LS40LTExLjM4LTEuMDEtMTUuNTUtMi41Ny0yOS45Ny05LjkxLTQxLjQ1LTIxLjI4LTE0LjI0LTE0LjA5LTIyLjM1LTMyLjc3LTIyLjgyLTUyLjU4LS42Ni0yNy45NyAxMy45NC01NC4xMSAzOC4xLTY4LjIzIDYuODctNC4wMSAxMS4xNS0xMS40NiAxMS4xNS0xOS40MnYtMjYxLjk1YzAtMTAuNjYgNi4xLTE5LjkzIDE1LTI0LjQ5IDMuNzUtMS45MyA4LTMuMDEgMTIuNS0zLjAxIDE1LjE2IDAgMjcuNDkgMTIuMzQgMjcuNDkgMjcuNXYyNjEuOTVjMCA3Ljk2IDQuMjggMTUuNDEgMTEuMTUgMTkuNDIgMjMuNTEgMTMuNzQgMzguMTIgMzkuMTYgMzguMTIgNjYuMzV6IiBmaWxsPSIjZmY2ZTZlIi8+PHBhdGggZD0ibTI5Ni43NDEgNDA1LjM3YzAgMjAuNy04LjEyIDQwLjExLTIyLjg3IDU0LjY1LTE0LjQ3IDE0LjI4LTMzLjYxIDIyLjExLTUzLjk2IDIyLjExLS4zNSAwLS42OSAwLTEuMDMtLjAxLTMuODQtLjA1LTcuNjQtLjQtMTEuMzgtMS4wMSAxNS41Ny0yLjU0IDI5LjkzLTkuOCA0MS4zNy0yMS4wOSAxNC43NS0xNC41NCAyMi44Ny0zMy45NSAyMi44Ny01NC42NSAwLTI3LjE5LTE0LjYxLTUyLjYxLTM4LjEyLTY2LjM1LTYuODctNC4wMS0xMS4xNS0xMS40Ni0xMS4xNS0xOS40MnYtMjYxLjk1YzAtMTAuNjYtNi4xLTE5LjkyLTE0Ljk5LTI0LjQ5IDMuNzUtMS45MyA4LTMuMDEgMTIuNS0zLjAxIDE1LjE2IDAgMjcuNDkgMTIuMzQgMjcuNDkgMjcuNXYyNjEuOTVjMCA3Ljk2IDQuMjggMTUuNDEgMTEuMTUgMTkuNDIgMjMuNTEgMTMuNzQgMzguMTIgMzkuMTYgMzguMTIgNjYuMzV6IiBmaWxsPSIjZjQ0ZTkyIi8+PC9nPjxwYXRoIGQ9Im0yNDcuNDcxIDU3LjY1djY1LjU0aC01NC45OXYtNjUuNTRjMC0xMC42NiA2LjEtMTkuOTMgMTUtMjQuNDkgMy43NS0xLjkzIDgtMy4wMSAxMi41LTMuMDEgMTUuMTYgMCAyNy40OSAxMi4zNCAyNy40OSAyNy41eiIgZmlsbD0iIzRmNjY3YSIvPjxwYXRoIGQ9Im0yNDcuNDcxIDU3LjY1djY1LjU0aC0yNXYtNjUuNTRjMC0xMC42Ni02LjEtMTkuOTItMTQuOTktMjQuNDkgMy43NS0xLjkzIDgtMy4wMSAxMi41LTMuMDEgMTUuMTYgMCAyNy40OSAxMi4zNCAyNy40OSAyNy41eiIgZmlsbD0iIzNhNTM2NiIvPjwvZz48L3N2Zz4=" 
                 alt="temperature icon"
            />
            <img name="rain"
                 title="rain" 
                 onClick={ handleIconClick } 
                 className="data-type-icon" 
                 src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxwYXRoIGQ9Im02Ny45MTMgNDIyLjQ2NGMtNDYuMDM4IDQzLjA2OS0zNC41MiA4Mi4wMzYgMCA4Mi4wMzZzNDYuMDM4LTM4Ljk2NyAwLTgyLjAzNnoiIGZpbGw9IiM4MWViZWIiLz48cGF0aCBkPSJtMTU2Ljk1NyAzNTQuNDg5Yy0yNy4zNDUgMjUuNTgyLTIwLjUwMyA0OC43MjcgMCA0OC43MjdzMjcuMzQ0LTIzLjE0NiAwLTQ4LjcyN3oiIGZpbGw9IiMwMGNlYzgiLz48cGF0aCBkPSJtNDQ0LjA4NyA0MjIuNDY0YzQ2LjAzOCA0My4wNjkgMzQuNTIgODIuMDM2IDAgODIuMDM2cy00Ni4wMzgtMzguOTY3IDAtODIuMDM2eiIgZmlsbD0iIzgxZWJlYiIvPjxwYXRoIGQ9Im0yNTYgNDA4Ljg0MWM1My42ODIgNTAuMjIxIDQwLjI1MiA5NS42NTkgMCA5NS42NTlzLTUzLjY4Mi00NS40MzggMC05NS42NTl6IiBmaWxsPSIjODFlYmViIi8+PHBhdGggZD0ibTM1Ny4wNDMgMzY0LjQ4NWMzMy41OTQgMzEuNDI4IDI1LjE4OSA1OS44NjMgMCA1OS44NjNzLTMzLjU5NC0yOC40MzUgMC01OS44NjN6IiBmaWxsPSIjMDBjZWM4Ii8+PC9nPjxwYXRoIGQ9Im00NjguNTYgMjA0LjY1YzAgOC4zOS0xLjExIDE2LjUxLTMuMTkgMjQuMjRsLTI3LjggNi4zOC0yNzEuNzQgNjIuMzJoLTY1LjM2Yy01MS4zNCAwLTkyLjk3LTQxLjYxLTkyLjk3LTkyLjk0IDAtNDQuNjggMzEuNTUtODEuOTkgNzMuNTktOTAuOTEgNC4zNy0zMi44IDIxLjcyLTYxLjUxIDQ2LjcxLTgwLjc5IDIwLjctMTUuOTUgNDYuNjUtMjUuNDUgNzQuODItMjUuNDUgNDIuOTUgMCA4MC43MyAyMi4wOCAxMDIuNjMgNTUuNDkgNy4zNS0yLjM2IDE1LjE4LTMuNjYgMjMuMzItMy42NiAzNS4xMyAwIDY0LjY3IDIzLjgzIDczLjM5IDU2LjE4IDM4LjUgMTEuMzcgNjYuNiA0Ni45NyA2Ni42IDg5LjE0eiIgZmlsbD0iI2VlZjBmNSIvPjxwYXRoIGQ9Im00NjguNTYgMjA0LjY1YzAgOC4zOS0xLjExIDE2LjUxLTMuMTkgMjQuMjRsLTI3LjggNi4zOGMuNjUtNC40NC45OS04Ljk5Ljk5LTEzLjYyIDAtNDIuMTctMjguMS03Ny43Ny02Ni42LTg5LjE0LTguNzItMzIuMzUtMzguMjYtNTYuMTgtNzMuMzktNTYuMTgtOC4xNCAwLTE1Ljk3IDEuMy0yMy4zMiAzLjY2LTIxLjktMzMuNDEtNTkuNjgtNTUuNDktMTAyLjYzLTU1LjQ5LTE1LjgyIDAtMzAuOTQgMy00NC44MiA4LjQ1IDIwLjctMTUuOTUgNDYuNjUtMjUuNDUgNzQuODItMjUuNDUgNDIuOTUgMCA4MC43MyAyMi4wOCAxMDIuNjMgNTUuNDkgNy4zNS0yLjM2IDE1LjE4LTMuNjYgMjMuMzItMy42NiAzNS4xMyAwIDY0LjY3IDIzLjgzIDczLjM5IDU2LjE4IDM4LjUgMTEuMzcgNjYuNiA0Ni45NyA2Ni42IDg5LjE0eiIgZmlsbD0iI2RhZTFlYSIvPjxwYXRoIGQ9Im01MDQuNSAyNjYuMjFjMCAxOC4xMi04LjExIDM0LjM0LTIwLjkxIDQ1LjIzLTEwLjM3IDguODUtMjMuODIgMTQuMTgtMzguNTIgMTQuMTgtMjAuNjYgMC0zOC44Ni0xMC41NC00OS41MS0yNi41My0xNi4xNiAxNi4zNy0zOC42IDI2LjUzLTYzLjQzIDI2LjUzLTE2LjczIDAtMzIuMzctNC42Mi00NS43NS0xMi42My0xMS4xNSA3Ljk0LTI0Ljc4IDEyLjYzLTM5LjUxIDEyLjYzLTM3LjY0IDAtNjguMTYtMzAuNTEtNjguMTYtNjguMTQgMC0zNy42MiAzMC41Mi02OC4xMyA2OC4xNi02OC4xMyAzLjE1IDAgNi4yNC4yMyA5LjI4LjY1IDE1LjY3LTI1LjUyIDQzLjg0LTQyLjU0IDc1Ljk4LTQyLjU0IDQxLjE1IDAgNzUuNzYgMjcuODkgODYuMDEgNjUuNzggOC4wOS00LjExIDE3LjIzLTYuNDUgMjYuOTMtNi40NSAzMi44MiAwIDU5LjQzIDI2LjYgNTkuNDMgNTkuNDJ6IiBmaWxsPSIjZGFlMWVhIi8+PHBhdGggZD0ibTUwNC41IDI2Ni4yMWMwIDE4LjEyLTguMTEgMzQuMzQtMjAuOTEgNDUuMjMgMi41My02LjU5IDMuOTEtMTMuNzUgMy45MS0yMS4yMyAwLTMyLjgyLTI2LjYxLTU5LjQyLTU5LjQzLTU5LjQyLTkuNyAwLTE4Ljg0IDIuMzQtMjYuOTMgNi40NS0xMC4yNS0zNy44OS00NC44Ni02NS43OC04Ni4wMS02NS43OC0zMi44NSAwLTQ3LjEyIDEyLjctNTguOTggMTguNTQgMTUuNjctMjUuNTIgNDMuODQtNDIuNTQgNzUuOTgtNDIuNTQgNDEuMTUgMCA3NS43NiAyNy44OSA4Ni4wMSA2NS43OCA4LjA5LTQuMTEgMTcuMjMtNi40NSAyNi45My02LjQ1IDMyLjgyIDAgNTkuNDMgMjYuNiA1OS40MyA1OS40MnoiIGZpbGw9IiNiOWNmZGYiLz48L2c+PGc+PHBhdGggZD0ibTE1IDIwNC42NTJjMC00MC4xMTYgMjguNDUtNzUuMjYzIDY3LjY0Ny04My41NzIgMy4xMDUtLjY1OCA1LjQ2LTMuMjAxIDUuODc5LTYuMzQ3IDEuODQxLTEzLjgyNyA2LjEzOS0yNy4wNTcgMTIuNzc1LTM5LjMyMyAxLjk3MS0zLjY0My42MTUtOC4xOTQtMy4wMjgtMTAuMTY2LTMuNjQ0LTEuOTcyLTguMTk0LS42MTUtMTAuMTY2IDMuMDI4LTYuNjgzIDEyLjM1My0xMS4yNjkgMjUuNTY4LTEzLjY2NSAzOS4zNTYtMjAuMTY1IDUuNDA3LTM4LjM3NiAxNy4xMzQtNTEuNzE0IDMzLjQtMTQuNjU2IDE3Ljg3Ni0yMi43MjggNDAuNDcyLTIyLjcyOCA2My42MjQgMCAxOC42MjUgNS4xNCAzNi44MTMgMTQuODYzIDUyLjU5NyAxLjQxNyAyLjMgMy44NzYgMy41NjcgNi4zOTMgMy41NjcgMS4zNDIgMCAyLjctLjM2IDMuOTI2LTEuMTE1IDMuNTI3LTIuMTczIDQuNjI1LTYuNzkzIDIuNDUyLTEwLjMxOS04LjI2NS0xMy40MTctMTIuNjM0LTI4Ljg4NC0xMi42MzQtNDQuNzN6Ii8+PHBhdGggZD0ibTEwMC40NzIgMjc1LjEwMWM0LjE0MiAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1OC03LjUtNy41LTcuNWMtMzAuNTg3IDAtNTUuNDcyLTI0Ljg3NC01NS40NzItNTUuNDQ4IDAtNC4xNDItMy4zNTgtNy41LTcuNS03LjVzLTcuNSAzLjM1OC03LjUgNy41YzAgMzguODQ1IDMxLjYxNCA3MC40NDggNzAuNDcyIDcwLjQ0OHoiLz48cGF0aCBkPSJtNDc2LjAzOCAyMDYuODk5Yy4wMTctLjc1LjAyNS0xLjQ5OS4wMjUtMi4yNDYgMC0yMi4xMTEtNy4wNS00My4wODUtMjAuMzg5LTYwLjY1NS0xMi4wNjQtMTUuODkxLTI4Ljg2OS0yOC4wMDItNDcuNjUxLTM0LjQyMi0xMS4wNzItMzQuMjAxLTQzLjE2NC01Ny43NC03OS40NTItNTcuNzQtNi44MjcgMC0xMy41OTUuODMtMjAuMTg5IDIuNDcxLTI0LjQ1Ny0zNC4xMDgtNjMuNTg5LTU0LjMwNy0xMDUuNzY0LTU0LjMwNy0zNC44NzYgMC02Ny42MzEgMTMuNjEyLTkyLjIzIDM4LjMyOS0yLjkyMiAyLjkzNi0yLjkxMSA3LjY4NS4wMjUgMTAuNjA2IDIuOTM2IDIuOTIyIDcuNjg1IDIuOTExIDEwLjYwNi0uMDI1IDIxLjc2NC0yMS44NjcgNTAuNzQzLTMzLjkxIDgxLjU5OS0zMy45MSAzOC45NTUgMCA3NC45NzYgMTkuNDc4IDk2LjM1NiA1Mi4xMDQgMS44NSAyLjgyMyA1LjM1NiA0LjA2NCA4LjU3MSAzLjAyOCA2Ljc5Ny0yLjE4OCAxMy44NzItMy4yOTggMjEuMDI1LTMuMjk4IDMwLjkxNSAwIDU4LjExNyAyMC44MiA2Ni4xNSA1MC42MzIuNjc5IDIuNTE4IDIuNjE3IDQuNTAzIDUuMTE4IDUuMjQyIDE3LjMyIDUuMTEzIDMyLjkwNiAxNS44OTUgNDMuODg3IDMwLjM1OSAxMC42NDcgMTQuMDI1IDE2LjU4MiAzMC42MDQgMTcuMjY5IDQ4LjE0Mi01LjEwNy0xLjI1MS0xMC40NDItMS45MTUtMTUuOTMtMS45MTUtNy43IDAtMTUuMTY3IDEuMjc4LTIyLjI5MiAzLjgwOS0yLjk3Ny04LjA3Mi03LjAyMy0xNS42OTgtMTIuMDgzLTIyLjc1OC0yLjQxMy0zLjM2Ny03LjA5OC00LjE0LTEwLjQ2NS0xLjcyN3MtNC4xNCA3LjA5OS0xLjcyNyAxMC40NjVjNS42OTIgNy45NDEgOS44NjUgMTYuNzI5IDEyLjQwNSAyNi4xMi41ODkgMi4xODEgMi4xMzEgMy45NzkgNC4xOTYgNC44OTYgMi4wNjMuOTE3IDQuNDMyLjg1NCA2LjQ0Ni0uMTcgNy4zNDUtMy43MzkgMTUuMjU4LTUuNjM0IDIzLjUyMS01LjYzNCAyOC42MzcgMCA1MS45MzUgMjMuMjg4IDUxLjkzNSA1MS45MTNzLTIzLjI5OCA1MS45MTMtNTEuOTM1IDUxLjkxM2MtMTcuNDE2IDAtMzMuNTg3LTguNjY5LTQzLjI1OS0yMy4xOS0xLjI1LTEuODc3LTMuMjgtMy4wOTMtNS41MjYtMy4zMDgtMi4yNDYtLjIxOS00LjQ2OS41OTItNi4wNTQgMi4xOTgtMTUuNDY0IDE1LjY3LTM2LjA5NyAyNC4zMDEtNTguMDk1IDI0LjMwMS0xNC43ODEgMC0yOS4yNjgtNC00MS44OTQtMTEuNTY2LTIuNTU3LTEuNTMzLTUuNzc5LTEuNDA1LTguMjA4LjMyNS0xMC4zMTkgNy4zNTQtMjIuNDc3IDExLjI0MS0zNS4xNTkgMTEuMjQxLTMzLjQ0OCAwLTYwLjY2LTI3LjIwMS02MC42Ni02MC42MzVzMjcuMjEyLTYwLjYzNSA2MC42Ni02MC42MzVjMi42NzUgMCA1LjQ1Ny4xOTQgOC4yNjkuNTc3IDIuOTQ0LjM5NyA1Ljg0Ni0uOTc0IDcuNDAxLTMuNTA1IDE0Ljk4Ny0yNC4zOTQgNDEuMDAzLTM4Ljk1OCA2OS41OTEtMzguOTU4IDE0Ljg3IDAgMjkuNDE5IDQuMDM1IDQyLjA3NSAxMS42NjkgMy41NDggMi4xNDEgOC4xNTcuOTk4IDEwLjI5Ni0yLjU0OXMuOTk4LTguMTU2LTIuNTQ5LTEwLjI5NmMtMTQuOTk0LTkuMDQ0LTMyLjIyMi0xMy44MjQtNDkuODIyLTEzLjgyNC0zMi4yNDMgMC02MS43MTkgMTUuNjQ3LTc5Ljc3MiA0Mi4wOTQtMS44NTMtLjEzOC0zLjY4Ny0uMjA4LTUuNDg5LS4yMDgtNDEuNzE5IDAtNzUuNjYgMzMuOTMtNzUuNjYgNzUuNjM1IDAgMTEuNjY4IDIuNjU3IDIyLjcyNyA3LjM5NyAzMi42MDVoLTc4LjEzNGMtMTguMDIgMC0zNS4yNS01LjUzNy00OS44My0xNi4wMTMtMy4zNjMtMi40MTctOC4wNS0xLjY0OS0xMC40NjcgMS43MTQtMi40MTcgMy4zNjQtMS42NDkgOC4wNSAxLjcxNCAxMC40NjcgMTcuMTQ2IDEyLjMyIDM3LjQwMyAxOC44MzIgNTguNTgzIDE4LjgzMmg4Ny42NDRjMTMuODg0IDE3LjA5IDM1LjA2NCAyOC4wMyA1OC43NTMgMjguMDMgMTQuMTk4IDAgMjcuODY5LTMuOTA2IDM5LjgzMS0xMS4zMzggMTMuOTM1IDcuNDMxIDI5LjU0IDExLjMzOCA0NS40MzEgMTEuMzM4IDIzLjE2OSAwIDQ1LjA1Ny04LjA4NSA2Mi40OTUtMjIuOTMxIDEyLjYzNCAxNC40OTIgMzAuOTMxIDIyLjkzMSA1MC40NCAyMi45MzEgMzYuOTA4IDAgNjYuOTM1LTMwLjAxNyA2Ni45MzUtNjYuOTEzLS4wMDItMjUuNzMzLTE0LjYwNy00OC4xMTktMzUuOTY0LTU5LjMxeiIvPjxwYXRoIGQ9Im03My4wMzcgNDE2Ljk4NmMtMi44ODQtMi42OTctNy4zNjQtMi42OTctMTAuMjQ4IDAtMjcuMDUzIDI1LjMxLTM4LjMzNyA1Mi43NDctMzAuMTg1IDczLjM5NiA1LjM0NSAxMy41MzYgMTguNTQ0IDIxLjYxOCAzNS4zMDkgMjEuNjE4czI5Ljk2NC04LjA4MiAzNS4zMDktMjEuNjE4YzguMTUzLTIwLjY0OS0zLjEzMi00OC4wODYtMzAuMTg1LTczLjM5NnptMTYuMjMzIDY3Ljg4OGMtMy4wODggNy44MTktMTAuNjcyIDEyLjEyNi0yMS4zNTcgMTIuMTI2cy0xOC4yNjktNC4zMDctMjEuMzU2LTEyLjEyNmMtNC4xNzUtMTAuNTc1LS40NzEtMjkuNDQ1IDIxLjM1Ni01MS45MTEgMjEuODI4IDIyLjQ2NSAyNS41MzIgNDEuMzM2IDIxLjM1NyA1MS45MTF6Ii8+PHBhdGggZD0ibTE2Mi4wOCAzNDkuMDEyYy0yLjg4My0yLjY5Ny03LjM2NC0yLjY5Ny0xMC4yNDcgMC0xNy4wMTcgMTUuOTE5LTI0IDMzLjQ2Ni0xOC42ODEgNDYuOTM3IDMuNjUxIDkuMjQ3IDEyLjU1IDE0Ljc2NyAyMy44MDUgMTQuNzY3czIwLjE1My01LjUyMSAyMy44MDUtMTQuNzY3YzUuMzE4LTEzLjQ3MS0xLjY2NS0zMS4wMTgtMTguNjgyLTQ2LjkzN3ptNC43MjkgNDEuNDI4Yy0xLjgxMyA0LjU5LTYuOTUxIDUuMjc2LTkuODUzIDUuMjc2cy04LjA0LS42ODYtOS44NTMtNS4yNzZjLTEuOTAzLTQuODE5LS4xODMtMTMuOTkgOS44NTMtMjUuMjQ3IDEwLjAzNiAxMS4yNTcgMTEuNzU2IDIwLjQyOCA5Ljg1MyAyNS4yNDd6Ii8+PHBhdGggZD0ibTQ0OS4yMTEgNDE2Ljk4NmMtMi44ODQtMi42OTctNy4zNjQtMi42OTctMTAuMjQ4IDAtMjcuMDUzIDI1LjMxLTM4LjMzNyA1Mi43NDctMzAuMTg1IDczLjM5NiA1LjM0NSAxMy41MzYgMTguNTQ0IDIxLjYxOCAzNS4zMDkgMjEuNjE4czI5Ljk2NC04LjA4MiAzNS4zMDktMjEuNjE4YzguMTUyLTIwLjY0OS0zLjEzMi00OC4wODYtMzAuMTg1LTczLjM5NnptMTYuMjMyIDY3Ljg4OGMtMy4wODcgNy44Mi0xMC42NzIgMTIuMTI2LTIxLjM1NiAxMi4xMjZzLTE4LjI2OS00LjMwNy0yMS4zNTYtMTIuMTI2Yy00LjE3NS0xMC41NzUtLjQ3MS0yOS40NDUgMjEuMzU2LTUxLjkxMSAyMS44MjggMjIuNDY1IDI1LjUzMiA0MS4zMzYgMjEuMzU2IDUxLjkxMXoiLz48cGF0aCBkPSJtMjYxLjEyNCA0MDMuMzY0Yy0yLjg4Mi0yLjY5Ni03LjM2My0yLjY5Ny0xMC4yNDcgMC0xMC4zNzcgOS43MDgtMTguODA1IDE5LjY4Ni0yNS4wNDggMjkuNjU3LTIuMTk4IDMuNTExLTEuMTM1IDguMTM5IDIuMzc2IDEwLjMzNyAzLjUxMSAyLjE5OSA4LjE0IDEuMTM1IDEwLjMzNy0yLjM3NiA0LjUxMS03LjIwNCAxMC4zNjktMTQuNDc0IDE3LjQ2MS0yMS42NzUgMjYuNjQ5IDI3LjAyNCAzMS4xMjggNDkuOTI4IDI2LjA2IDYyLjc2NS0zLjc0OCA5LjQ4Ny0xMy4yNDcgMTQuOTI4LTI2LjA2MyAxNC45MjgtOS4zMzkgMC0xNi44Ny0yLjc5NS0yMS43NzktOC4wODItNC41NDYtNC44OTYtNi42MjgtMTEuOC02LjAyMS0xOS45NjQuMzA3LTQuMTMxLTIuNzkzLTcuNzI4LTYuOTI0LTguMDM1LTQuMTI1LS4zMDgtNy43MjggMi43OTMtOC4wMzUgNi45MjQtLjkyNCAxMi40MzIgMi41MyAyMy4yNSA5Ljk4OCAzMS4yODIgNy43MDkgOC4zMDIgMTkuMzQ3IDEyLjg3NSAzMi43NzEgMTIuODc1IDE5LjAxOCAwIDMzLjk3Ni05LjEyOSA0MC4wMTMtMjQuNDE5IDkuMzEyLTIzLjU4NC0zLjczMS01NS4wNjctMzQuODg5LTg0LjIxN3oiLz48cGF0aCBkPSJtMzYyLjE2NyAzNTkuMDA4Yy0yLjg4My0yLjY5Ny03LjM2NC0yLjY5Ny0xMC4yNDcgMC0yMC4zNzIgMTkuMDU4LTI4Ljc5MyAzOS45MTEtMjIuNTI3IDU1Ljc4MiA0LjIxNyAxMC42ODEgMTQuNTU0IDE3LjA1OCAyNy42NSAxNy4wNThzMjMuNDM0LTYuMzc2IDI3LjY1LTE3LjA1OGM2LjI2Ny0xNS44NzEtMi4xNTQtMzYuNzI0LTIyLjUyNi01NS43ODJ6bTguNTc1IDUwLjI3NGMtMi41OTkgNi41ODMtOS42OTggNy41NjYtMTMuNjk5IDcuNTY2cy0xMS4xLS45ODMtMTMuNjk5LTcuNTY2Yy0zLjkzNC05Ljk2MyA0LjA4Ny0yMy42MTYgMTMuNjk5LTM0LjEzNCA5LjYxMiAxMC41MTggMTcuNjMzIDI0LjE3IDEzLjY5OSAzNC4xMzR6Ii8+PC9nPjwvc3ZnPg=="
                 alt="rain icon"
            />
            <img name="daylength" 
                 title="day length"
                 onClick={ handleIconClick } 
                 className="data-type-icon" 
                 src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01MTIgMjU2YzAgMTQxLjM4NjcxOS0xMTQuNjEzMjgxIDI1Ni0yNTYgMjU2cy0yNTYtMTE0LjYxMzI4MS0yNTYtMjU2IDExNC42MTMyODEtMjU2IDI1Ni0yNTYgMjU2IDExNC42MTMyODEgMjU2IDI1NnptMCAwIiBmaWxsPSIjNGE3YWZmIi8+PGcgZmlsbD0iIzI4NjRmMCI+PHBhdGggZD0ibTE0Ny40NjA5MzggMTY4LjY3MTg3NSAyNzguNjI4OTA2IDI3OC42MzI4MTNjNy40NzY1NjItNi42NTIzNDQgMTQuNTYyNS0xMy43MzgyODIgMjEuMjE0ODQ0LTIxLjIxNDg0NGwtMjc4LjYzMjgxMy0yNzguNjI4OTA2em0wIDAiLz48cGF0aCBkPSJtMjk3LjYxMzI4MSA1MDguNjEzMjgxYzIzLjUwNzgxMy0zLjg0Mzc1IDQ1LjkzNzUtMTAuODg2NzE5IDY2LjgyODEyNS0yMC42NzE4NzVsLTI0Ni45NDE0MDYtMjQ2Ljk0MTQwNi01Ny41IDMwem0wIDAiLz48cGF0aCBkPSJtMjcxIDYwLTMwIDU3LjUgMjQ2Ljk0MTQwNiAyNDYuOTQxNDA2YzkuNzg1MTU2LTIwLjg5MDYyNSAxNi44MjgxMjUtNDMuMzIwMzEyIDIwLjY3MTg3NS02Ni44MjgxMjV6bTAgMCIvPjwvZz48cGF0aCBkPSJtMjU2IDEzNS4xMjg5MDZjLTY2Ljc1MzkwNiAwLTEyMC44NzEwOTQgNTQuMTE3MTg4LTEyMC44NzEwOTQgMTIwLjg3MTA5NCAwIDMzLjU3ODEyNSAxMy42OTUzMTMgNjMuOTU3MDMxIDM1LjgwNDY4OCA4NS44NTkzNzVsMTcwLjkyNTc4MS0xNzAuOTI1NzgxYy0yMS45MDIzNDQtMjIuMTA5Mzc1LTUyLjI4MTI1LTM1LjgwNDY4OC04NS44NTkzNzUtMzUuODA0Njg4em0wIDAiIGZpbGw9IiNmZGJhMTIiLz48cGF0aCBkPSJtMzQxLjg1OTM3NSAxNzAuOTMzNTk0Yy0yMS45MDIzNDQtMjIuMTA5Mzc1LTUyLjI4MTI1LTM1LjgwNDY4OC04NS44NTkzNzUtMzUuODA0Njg4LTMzLjUyNzM0NCAwLTYzLjg2NzE4OCAxMy42NTYyNS04NS43NjE3MTkgMzUuNzAzMTI1bDg1Ljg1OTM3NSA4NS44NjMyODF6bTAgMCIgZmlsbD0iI2ZmYTMwMCIvPjxwYXRoIGQ9Im0yNTYgMTc1LjMzMjAzMWMtNDQuNTUwNzgxIDAtODAuNjY3OTY5IDM2LjExNzE4OC04MC42Njc5NjkgODAuNjY3OTY5IDAgMjIuNDc2NTYyIDkuMjAzMTI1IDQyLjgwMDc4MSAyNC4wMzUxNTcgNTcuNDI1NzgxbDExNC4wNTg1OTMtMTE0LjA1ODU5M2MtMTQuNjI1LTE0LjgzMjAzMi0zNC45NDkyMTktMjQuMDM1MTU3LTU3LjQyNTc4MS0yNC4wMzUxNTd6bTAgMCIgZmlsbD0iI2ZjZGExNSIvPjxwYXRoIGQ9Im0zMTMuNDI1NzgxIDE5OS4zNjcxODhjLTE0LjYyNS0xNC44MzIwMzItMzQuOTQ5MjE5LTI0LjAzNTE1Ny01Ny40MjU3ODEtMjQuMDM1MTU3LTIyLjQyNTc4MSAwLTQyLjcxMDkzOCA5LjE2MDE1Ny01Ny4zMjgxMjUgMjMuOTMzNTk0bDU3LjQyNTc4MSA1Ny40MjU3ODF6bTAgMCIgZmlsbD0iI2ZmZDQwMCIvPjxwYXRoIGQ9Im0yNDEgNjBoMzB2NTcuNWgtMzB6bTAgMCIgZmlsbD0iI2ZmYTMwMCIvPjxwYXRoIGQ9Im02MCAyNDFoNTcuNXYzMGgtNTcuNXptMCAwIiBmaWxsPSIjZmRiYTEyIi8+PHBhdGggZD0ibTM0My4zMjQyMTkgMTQ3LjQ2MDkzOCA0MC42NjAxNTYtNDAuNjYwMTU3IDExLjAwMzkwNiAxMS4wMDM5MDctNDAuNjYwMTU2IDQwLjY2MDE1NnptMCAwIiBmaWxsPSIjZmZhMzAwIi8+PHBhdGggZD0ibTEwNi43OTY4NzUgMzgzLjk4NDM3NSA0MC42NjAxNTYtNDAuNjYwMTU2IDExIDExLjAwMzkwNi00MC42NTYyNSA0MC42NjAxNTZ6bTAgMCIgZmlsbD0iI2ZkYmExMiIvPjxwYXRoIGQ9Im0xMDYuNzk2ODc1IDEyOC4wMTU2MjUgMjEuMjE0ODQ0LTIxLjIxNDg0NCA0MC42NTYyNSA0MC42NjAxNTctMjEuMjEwOTM4IDIxLjIxMDkzN3ptMCAwIiBmaWxsPSIjZmRiYTEyIi8+PHBhdGggZD0ibTExNy4xMDkzNzUgMTE3LjcwNzAzMSAxMC45MDIzNDQtMTAuOTA2MjUgNDAuNjYwMTU2IDQwLjY2MDE1Ny0xMC45MDYyNSAxMC45MDIzNDN6bTAgMCIgZmlsbD0iI2ZmYTMwMCIvPjxwYXRoIGQ9Im03Mi43MjI2NTYgNDM0LjcwMzEyNWMuNzUzOTA2Ljc3MzQzNyAxLjQ5MjE4OCAxLjU1MDc4MSAyLjI1NzgxMyAyLjMxNjQwNiA5OS45NzI2NTYgOTkuOTcyNjU3IDI2Mi4wNjI1IDk5Ljk3MjY1NyAzNjIuMDM5MDYyIDAgOTkuOTcyNjU3LTk5Ljk3MjY1NiA5OS45NzI2NTctMjYyLjA2NjQwNiAwLTM2Mi4wMzkwNjItLjc2NTYyNS0uNzY1NjI1LTEuNTQyOTY5LTEuNTAzOTA3LTIuMzE2NDA2LTIuMjU3ODEzem0wIDAiIGZpbGw9IiM0MTQ5NTIiLz48cGF0aCBkPSJtNDM3LjAxOTUzMSA3NC45ODA0NjljLS43NjU2MjUtLjc2NTYyNS0xLjU0Mjk2OS0xLjUwMzkwNy0yLjMxNjQwNi0yLjI1NzgxM2wtMTgxLjI4OTA2MyAxODEuMjg5MDYzIDE4My4zMDQ2ODggMTgzLjMwMDc4MWMuMDk3NjU2LS4wOTc2NTYuMjAzMTI1LS4xOTUzMTIuMzAwNzgxLS4yOTI5NjkgOTkuOTcyNjU3LTk5Ljk3MjY1NiA5OS45NzI2NTctMjYyLjA2NjQwNiAwLTM2Mi4wMzkwNjJ6bTAgMCIgZmlsbD0iIzMzMzk0MCIvPjxwYXRoIGQ9Im0zNjIuMjQyMTg4IDI3OS4zMDg1OTRjMCA0Mi4yOTI5NjgtMzQuMjgxMjUgNzYuNTc4MTI1LTc2LjU3NDIxOSA3Ni41NzgxMjUtMjEuNDE0MDYzIDAtNDAuNzczNDM4LTguNzk2ODc1LTU0LjY3MTg3NS0yMi45NjQ4NDQgOS4zNDc2NTYgMzkuNzIyNjU2IDQ1LjAxNTYyNSA2OS4yOTY4NzUgODcuNTkzNzUgNjkuMjk2ODc1IDQ5LjY5OTIxOCAwIDg5Ljk4ODI4MS00MC4yODkwNjIgODkuOTg0Mzc1LTg5Ljk4ODI4MSAwLTQyLjU3ODEyNS0yOS41NzAzMTMtNzguMjQ2MDk0LTY5LjI5Njg3NS04Ny41OTM3NSAxNC4xNzE4NzUgMTMuODk0NTMxIDIyLjk2NDg0NCAzMy4yNTM5MDYgMjIuOTY0ODQ0IDU0LjY3MTg3NXptMCAwIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTQwOC41NzgxMjUgMzEyLjIzMDQ2OWMwLTQyLjU3ODEyNS0yOS41NzQyMTktNzguMjQ2MDk0LTY5LjMwMDc4MS04Ny41OTM3NSAxNC4xNzE4NzUgMTMuODk4NDM3IDIyLjk2ODc1IDMzLjI1NzgxMiAyMi45Njg3NSA1NC42NzE4NzUgMCAyMi45MTc5NjgtMTAuMDgyMDMyIDQzLjQ2NDg0NC0yNi4wMzEyNSA1Ny41bDQyLjQyOTY4NyA0Mi40Mjk2ODdjMTguMzcxMDk0LTE2LjQ3MjY1NiAyOS45MzM1OTQtNDAuMzkwNjI1IDI5LjkzMzU5NC02Ny4wMDc4MTJ6bTAgMCIgZmlsbD0iI2U5ZWRmNSIvPjwvc3ZnPg==" 
                 alt="day length icon"
            />
        </div>
     );
}

DataTypeIcons.propTypes = {
    handleDataTypeChange: PropTypes.func,
    dataType: PropTypes.string
}



export default DataTypeIcons;