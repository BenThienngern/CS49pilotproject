import styles from "../../styles/stanley.module.css";
import { Container, Row, Spacer } from "@nextui-org/react";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import Navbar from "./navbar";
import React from "react";

class Touchpad extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pixels: Array.from({length: 1024}, (v, i) => 0),
            down: false
        }

        this.press = this.press.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({down: !this.state.down});
    }

    deactivate(){
        this.setState({down: false});
    }

    press(event){
        if(this.state.down){
            let el = event.target;
            let x = Array.from(el.parentNode.children).indexOf(el);
            let y = Array.from(el.parentNode.parentNode.children).indexOf(el.parentNode);
            this.state.pixels[y * 32 + x] = 1;
            this.setState({board: this.state.pixels});
        }
    }

    render(){
        let table = [];
        for(let i = 0; i < 32; i++){
            let row = [];
            for(let j = 0; j < 32; j++){
                row.push((<td key={`${i}-${j}`} onMouseMove={this.press} className={styles.padPixel} style={{opacity: this.state.pixels[i * 32 + j]}}></td>));
            }
            table.push((<tr key={i}>{row}</tr>));
        }
        return (
            <table id={styles.pad} onMouseLeave={this.deactivate} onMouseDown={this.toggle} onMouseUp={this.toggle}>
                <tbody>{table}</tbody>
            </table>
        );
    }
}

class ConnectFour extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            board:  Array.from({length: 42}, (v, i) => null),
            team: 0,
            finished: false
        };

        this.play = this.play.bind(this);
    }

    getCell(row, col){
        return this.state.board[row * 7 + col];
    }

    setCell(row, col, value){
        this.state.board[row * 7 + col] = value;
        this.setState({board: this.state.board});
    }

    checkFour(){
        for(let i = -2; i < 4; i++){
            let color = null;
            let connect = 1;
            for(let j = 0; j < 6; j++){
                if(i + j >= 0 && i + j < 7){
                    if(color === null) color = this.getCell(j, i + j);
                    else if(this.getCell(j, i + j) === color) connect += 1;
                    else{
                        color = this.getCell(j , i + j);
                        connect = 1;
                    }
                    if(connect >= 4) return color;
                }
            }
        }
        for(let i = 3; i < 9; i++){
            let color = null;
            let connect = 1;
            for(let j = 0; j < 6; j++){
                if(i - j >= 0 && i - j < 7){
                    if(color === null) color = this.getCell(j, i - j);
                    else if(this.getCell(j, i - j) === color) connect += 1;
                    else{
                        color = this.getCell(j, i - j);
                        connect = 1;
                    }
                    if(connect >= 4) return color;
                }
            }
        }
        for(let i = 0; i < 6; i++){
            let color = null;
            let connect = 1;
            for(let j = 0; j < 7; j++){
                if(color === null) color = this.getCell(i, j);
                else if(this.getCell(i, j) === color) connect += 1;
                else{
                    color = this.getCell(i, j);
                    connect = 1;
                }
                if(connect >= 4) return color;
            }
        }
        for(let i = 0; i < 7; i++){
            let color = null;
            let connect = 1;
            for(let j = 0; j < 6; j++){
                if(color === null) color = this.getCell(j, i);
                else if(this.getCell(j, i) === color) connect += 1;
                else{
                    color = this.getCell(j, i);
                    connect = 1;
                }
                if(connect >= 4) return color;
            }
        }
        return null;
    }

    switchTeam(){
        this.setState({team: this.state.team === 0 ? 1 : 0});
    }

    getTeamClass(color){
        if(color === 0) return styles.teamOrange;
        else if(color === 1) return styles.teamBlue;
        else return "";
    }

    getTeamName(color){
        if(color === 0) return "Orange wins!";
        else if(color === 1) return "Blue wins!";
        else if(color === -1) return "Tie!"
        else return "";
    }

    play(event){
        if(!this.state.finished){
            let el = event.target;
            let col = Array.from(el.parentNode.children).indexOf(el);
            for(let i = 5; i > -1; i--){
                if(this.getCell(i, col) === null){
                    this.setCell(i, col, this.state.team);
                    let check = this.checkFour();
                    if(check !== null){
                        this.setState({finished: true});
                        new Audio("/stanley/victory.mp3").play();
                    }else if(!this.state.board.includes(null)){
                        this.setState({team: -1, finished: true});
                        new Audio("/stanley/victory.mp3").play();
                    }else{
                        this.switchTeam();
                    }
                    break;
                }
            }
        }
    }

    render(){
        let table = [];
        for(let i = 0; i < 6; i++){
            let row = [];
            for(let j = 0; j < 7; j++){
                row.push((<td key={`${i}-${j}`} onClick={this.play} className={this.getTeamClass(this.state.board[i * 7 + j])}></td>));
            }
            table.push((
                <tr key={i}>{row}</tr>
            ));
        }
        return (
            <div>
                <div hidden={!this.state.finished} id={styles.victory}><span id={styles.victoryText}>{this.getTeamName(this.state.team)}</span></div>
                <div id={styles.currentPlayer}>
                    <span>Next: </span>
                    <div className={this.getTeamClass(this.state.team)}></div>
                </div>
                <table id={styles.frame}>
                    <tbody>{table}</tbody>
                </table>
            </div>
        );
    }
}

export function AppBody(){
    return (
        <SSRProvider>
            <Head>
                <title>Stanley&apos;s Personal Page - CS49</title>
            </Head>
            <Navbar />
            <Container justify="center" css={{minHeight:0}}>
                <Row justify="center">
                    <h1>Stanley&apos;s Page 🦖</h1>
                </Row>
                <Row justify="center">
                    <h2 style={{margin:0}}>Interactive Code in React</h2>
                </Row>
                <Spacer y={1} />
                <Row justify="center">
                    <h3>Touchpad</h3>
                </Row>
                <Row justify="center">
                    <Touchpad />
                </Row>
                <Spacer y={1} />
                <Row justify="center">
                    <h3>Connect Four</h3>
                </Row>
                <Row justify="center">
                    <ConnectFour />
                </Row>
            </Container>
        </SSRProvider>
    );
}