import React, { Component } from "react";
import './SortingVisualizer.css';
import { render } from "@testing-library/react";
import { getMergeSortAnimations } from "../SortingAlgo/sortingAlgorithms";

const ANIMATION_SPEED_MS =1;

const NUMBER_OF_BARS =310;

const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }


    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=0;i <NUMBER_OF_BARS ;i++){
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }
    mergeSort(){
       const animations = getMergeSortAnimations(this.state.array);
       for(let i=0;i<animations.length ;i++){
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i%3 !==2;

            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i* ANIMATION_SPEED_MS);
            }else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    quickSort(){

    }
    bubbleSort(){

    }
    heapSort(){

    }
    testSort(){
        for(let i=0;i<100;i++){
            const array = [];
            const length = randomIntFromInterval(1,1000);
            for(let i=0;i <length; i++){
                array.push(randomIntFromInterval(-1000,1000));
            }
            const jsSortedArray =array.slice().sort((a,b)=>a-b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(jsSortedArray,mergeSortedArray));
        }
    }
    render(){
        const {array} = this.state;

        return(
            <div className="array-container">
                {
                    array.map((value, idx)=>(
                        <div className="array-bar" key={idx}
                        style={{height: `${value}px`}}>
                        </div>
                    ))
                }
                <button onClick={()=> this.resetArray()}>Generate New Array</button>
                <button onClick={()=> this.mergeSort()}>Merge Sort</button>
                <button onClick={()=> this.quickSort()}>Quick Sort</button>
                <button onClick={()=> this.heapSort()}>Heap Sort</button>
                <button onClick={()=> this.bubbleSort()}>Bubble Sort</button>
                <button onClick={()=> this.testSort()}>Test Sorting Algo (BROKEN)</button>
            </div>
        );
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()* (max - min +1) + min);
}

function arraysAreEqual(a1,a2){
    if(a1.length !== a2.length) return false;
    for(let i=0;i <a1.length ;i++){
        if(a1[i] !== a2[i]) return false;
    }
    return true;
}