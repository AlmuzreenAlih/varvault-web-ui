import './Icons.scss';
const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];

export function Pressure(props) {
    return (
    <div>
        <svg style={{ backgroundColor: colorArray[0] }} className="unit-symbol" width="220" height="222" viewBox="0 0 220 222" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="90" r="85" stroke="black" strokeWidth="10"/>
            <circle cx="110" cy="90" r="13" fill="black" stroke="black" strokeWidth="10"/>
            <line x1="96" y1="177" x2="96" y2="196" stroke="black" strokeWidth="10"/>
            <line x1="128" y1="175" x2="128" y2="194" stroke="black" strokeWidth="10"/>
            <line x1="-4.37114e-07" y1="191" x2="220" y2="191" stroke="black" strokeWidth="10"/>
            <line x1="-4.37114e-07" y1="217" x2="220" y2="217" stroke="black" strokeWidth="10"/>
            <line x1="109.464" y1="91.4645" x2="154.464" y2="46.4645" stroke="black" strokeWidth="10"/>
        </svg>
    </div>
    )
}

export function Temperature(props) {
    return (
        <svg style={{ backgroundColor: colorArray[1] }} className="unit-symbol" width="139" height="283" viewBox="0 0 139 283" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M94.581 155.973C107.92 161.635 118.899 171.722 125.668 184.534C132.437 197.346 134.583 212.1 131.744 226.31C128.904 240.519 121.253 253.315 110.08 262.542C98.9071 271.769 84.8949 276.862 70.4048 276.963C55.9147 277.065 41.8326 272.168 30.5318 263.098C19.2309 254.028 11.4021 241.339 8.3646 227.171C5.32713 213.002 7.26672 198.22 13.8565 185.315C20.4463 172.409 31.2834 162.17 44.5416 156.322" stroke="black" strokeWidth="12"/>
            <path d="M41 36C41 27.9631 44.062 20.304 49.4367 14.6956C54.8031 9.09587 62.0257 6 69.5 6C76.9743 5.99999 84.1969 9.09586 89.5632 14.6956C94.938 20.304 98 27.9631 98 36" stroke="black" strokeWidth="12"/>
            <line x1="41" y1="36" x2="41" y2="162" stroke="black" strokeWidth="12"/>
            <line x1="98" y1="35" x2="98" y2="162" stroke="black" strokeWidth="12"/>
            <circle cx="69.5" cy="214.5" r="35.5" stroke="black" strokeWidth="12"/>
            <line x1="69" y1="174" x2="69" y2="42" stroke="black" strokeWidth="12"/>
        </svg>
    )
}

export function Weight(props) {
    return (
        <svg style={{ backgroundColor: colorArray[2] }} className="unit-symbol" width="196" height="198" viewBox="0 0 196 198" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="98.5" cy="26.5" r="21.5" stroke="black" stroke-width="10"/>
            <path d="M6.8654 160.213L31.7419 68.2134C34.8078 56.8749 45.0949 49 56.8406 49H138.333C149.948 49 160.154 56.7036 163.337 67.8735L189.559 159.873C194.291 176.479 181.821 193 164.554 193H31.964C14.8437 193 2.39661 176.74 6.8654 160.213Z" fill="black" stroke="black" stroke-width="10"/>
        </svg>
    )
}

export function Voltage() {
    return (
        <svg style={{ backgroundColor: colorArray[3] }} className="unit-symbol" width="219" height="219" viewBox="0 0 219 219" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="109.5" cy="109.5" r="104.5" stroke="black" stroke-width="10"/>
            <path d="M109.467 18.1776L71.4674 118.178M151.467 101.178L113.467 201.178M109.5 18L109.5 102M113.5 118V201M110 101.5H152M71 118.5H113" stroke="black"/>
            <path d="M69 123.5L109.5 18.5V98H153.5L113.5 201.5V123.5H69Z" fill="black" stroke="black"/>
        </svg>
    )
}

export function Account(props) {
    return (
        <div style={{ backgroundColor: colorArray[1] }} className="unit-symbol">
            <i className="material-symbols-outlined">{props.char}</i>
        </div>
    )
}

export function TokenIcon(props) {
    return (
        <div style={{ backgroundColor: colorArray[2] }} className="unit-symbol">
            <i style={{fontWeight: "400"}}className="material-symbols-outlined">key</i>
        </div>
    )
}

export function VariableIcon(props) {
    return (
        <div style={{ backgroundColor: colorArray[3] }} className="unit-symbol">
            <i style={{fontWeight: "400"}}className="material-symbols-outlined">pin</i>
        </div>
    )
}

export function Default(props) {
    return (
        <div style={{ backgroundColor: props.bg }} className="unit-symbol">
            {props.letter}
        </div>
    )
}