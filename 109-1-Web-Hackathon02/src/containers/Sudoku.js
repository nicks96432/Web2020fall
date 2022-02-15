import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Fireworks } from "fireworks/lib/react";

import "./Sudoku.css";
import Header from "../components/Header";
import Grid9x9 from "../components/Grid9x9";
import ScreenInputKeyBoard from "../components/ScreenInputKeyBoard";
import { problemList } from "../problems";

class Sudoku extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true, // Return loading effect if this is true.
			problem: null, // Stores problem data. See "../problems/" for more information.This is the origin problem and should not be modified. This is used to distinguish the fixed numbers from the editable values
			gridValues: null, // A 2D array storing the current values on the gameboard. You should update this when updating the game board values.
			selectedGrid: { row_index: -1, col_index: -1 }, // This objecct store the current selected grid position. Update this when a new grid is selected.
			gameBoardBorderStyle: "8px solid #333", // This stores the gameBoarderStyle and is passed to the gameboard div. Update this to have a error effect (Bonus #2).
			completeFlag: false, // Set this flag to true when you wnat to set off the firework effect.
			conflicts: [{ row_index: -1, col_index: -1 }], // The array stores all the conflicts positions triggered at this moment. Update the array whenever you needed.
		};
	}

	handle_grid_1x1_click = (row_index, col_index) => {
		// TODO
		// Useful hints:
		// console.log(row_index, col_index);
		// console.log(this.state.selectedGrid);
		this.setState({ conflicts: [{ row_index: -1, col_index: -1 }] });
		if (this.state.problem.content[row_index][col_index] === "0")
			this.setState({ selectedGrid: { row_index: row_index, col_index: col_index } });
	};

	handleKeyDownEvent = (event) => {
		// TODO
		// Useful hints:
		// console.log(event);
		let selectedCol = this.state.selectedGrid.col_index;
		let selectedRow = this.state.selectedGrid.row_index;
		if (
			this.state.gridValues !== null &&
			selectedRow !== -1 &&
			selectedCol !== -1 &&
			((event.keyCode >= 48 && event.keyCode <= 57) ||
				(event.keyCode >= 96 && event.keyCode <= 105))
		) {
			let pressed = 0;
			if (event.keyCode < 90) pressed = event.keyCode - 48;
			else pressed = event.keyCode - 96;
			let conflict = false;
			let conflictTable = [];
			for (let i = 0; i < 9; ++i) {
				if (
					pressed !== 0 &&
					i !== selectedCol &&
					this.state.gridValues[i][selectedCol] === `${pressed}`
				) {
					conflict = true;
					conflictTable.push({ row_index: i, col_index: selectedCol });
				}
				if (
					pressed !== 0 &&
					i !== selectedRow &&
					this.state.gridValues[selectedRow][i] === `${pressed}`
				) {
					conflict = true;
					conflictTable.push({ row_index: selectedRow, col_index: i });
				}
			}
			const selectGrid9x9 = {
				row: selectedRow - (selectedRow % 3),
				col: selectedCol - (selectedCol % 3),
			};
			for (let i = selectGrid9x9.row; i < selectGrid9x9.row + 3; ++i) {
				for (let j = selectGrid9x9.col; j < selectGrid9x9.col + 3; ++j)
					if (
						i !== selectedRow &&
						j !== selectedCol &&
						pressed !== 0 &&
						this.state.gridValues[i][j] === `${pressed}`
					) {
						conflict = true;
						conflictTable.push({ row_index: i, col_index: j });
					}
			}
			if (
				!conflict &&
				this.state.problem !== null &&
				this.state.problem.content[this.state.selectedGrid.row_index][
					this.state.selectedGrid.col_index
				] === "0"
			) {
				this.setState((prevState) => {
					prevState.gridValues[this.state.selectedGrid.row_index][
						this.state.selectedGrid.col_index
					] = `${pressed}`;
					return {
						gridValues: prevState.gridValues,
						conflicts: [{ row_index: -1, col_index: -1 }],
					};
				});
			} else {
				this.setState({ conflicts: conflictTable, gameBoardBorderStyle: "8px solid #E77" });
				setTimeout(() => {
					this.setState({ gameBoardBorderStyle: "8px solid #333" });
				}, 1000);
			}
		}
	};

	handleScreenKeyboardInput = (num) => {
		// TODO
		let selectedCol = this.state.selectedGrid.col_index;
		let selectedRow = this.state.selectedGrid.row_index;
		if (this.state.gridValues !== null && selectedRow !== -1 && selectedCol !== -1) {
			let conflict = false;
			let conflictTable = [];
			for (let i = 0; i < 9; ++i) {
				if (
					num !== 0 &&
					i !== selectedCol &&
					this.state.gridValues[i][selectedCol] === `${num}`
				) {
					conflict = true;
					conflictTable.push({ row_index: i, col_index: selectedCol });
				}
				if (
					num !== 0 &&
					i !== selectedRow &&
					this.state.gridValues[selectedRow][i] === `${num}`
				) {
					conflict = true;
					conflictTable.push({ row_index: selectedRow, col_index: i });
				}
			}
			const selectGrid9x9 = {
				row: selectedRow - (selectedRow % 3),
				col: selectedCol - (selectedCol % 3),
			};
			for (let i = selectGrid9x9.row; i < selectGrid9x9.row + 3; ++i) {
				for (let j = selectGrid9x9.col; j < selectGrid9x9.col + 3; ++j)
					if (
						i !== selectedRow &&
						j !== selectedCol &&
						num !== 0 &&
						this.state.gridValues[i][j] === `${num}`
					) {
						conflict = true;
						conflictTable.push({ row_index: i, col_index: j });
					}
			}
			if (
				!conflict &&
				this.state.problem !== null &&
				this.state.problem.content[this.state.selectedGrid.row_index][
					this.state.selectedGrid.col_index
				] === "0"
			) {
				this.setState((prevState) => {
					prevState.gridValues[this.state.selectedGrid.row_index][
						this.state.selectedGrid.col_index
					] = `${num}`;
					return {
						gridValues: prevState.gridValues,
						conflicts: [{ row_index: -1, col_index: -1 }],
					};
				});
			} else {
				this.setState({ conflicts: conflictTable, gameBoardBorderStyle: "8px solid #E77" });
				setTimeout(() => {
					this.setState({ gameBoardBorderStyle: "8px solid #333" });
				}, 1000);
			}
		}
	};

	componentDidMount = () => {
		window.addEventListener("keydown", this.handleKeyDownEvent);
	};

	loadProblem = async (name) => {
		this.setState({
			loading: true,
			problem: null,
			gridValues: null,
			selectedGrid: { row_index: -1, col_index: -1 },
		});

		const problem = await require(`../problems/${name}`);
		if (problem.content !== undefined) {
			let gridValues = [];
			for (let i = 0; i < problem.content.length; i++)
				gridValues[i] = problem.content[i].slice();
			this.setState({ problem: problem, gridValues: gridValues, loading: false });
		}
	};

	extractArray(array, col_index, row_index) {
		let rt = [];
		for (let i = row_index; i < row_index + 3; i++) {
			for (let j = col_index; j < col_index + 3; j++) {
				rt.push(array[i][j]);
			}
		}
		return rt;
	}

	handleReset = () => {
		if (this.state.problem !== null) {
			let tmpGrid = this.state.gridValues;
			for (let i = 0; i < 9; ++i)
				for (let j = 0; j < 9; ++j)
					if (this.state.problem.content[i][j] === "0") {
						tmpGrid[i][j] = "0";
					}
			this.setState({ gridValues: tmpGrid });
		}
	};
	render() {
		const fxProps = {
			count: 3,
			interval: 700,
			canvasWidth: window.innerWidth,
			canvasHeight: window.innerHeight,
			colors: ["#cc3333", "#81C784"],
			calc: (props, i) => ({
				...props,
				x: (i + 1) * (window.innerWidth / 3) * Math.random(),
				y: window.innerHeight * Math.random(),
			}),
		};
		return (
			<>
				<Header
					problemList={problemList}
					loadProblem={this.loadProblem}
					gridValues={this.state.gridValues}
					problem={this.state.problem}
					resetGame={this.handleReset}
				/>
				{this.state.loading ? (
					<ReactLoading type={"bars"} color={"#777"} height={"40vh"} width={"40vh"} />
				) : (
					<div
						id="game-board"
						className="gameBoard"
						style={{ border: this.state.gameBoardBorderStyle }}
					>
						<div className="row">
							<Grid9x9
								row_offset={0}
								col_offset={0}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 0, 0)}
								fixedValue={this.extractArray(this.state.problem.content, 0, 0)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={0}
								col_offset={3}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 3, 0)}
								fixedValue={this.extractArray(this.state.problem.content, 3, 0)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={0}
								col_offset={6}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 6, 0)}
								fixedValue={this.extractArray(this.state.problem.content, 6, 0)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>
						</div>
						<div className="row">
							<Grid9x9
								row_offset={3}
								col_offset={0}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 0, 3)}
								fixedValue={this.extractArray(this.state.problem.content, 0, 3)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={3}
								col_offset={3}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 3, 3)}
								fixedValue={this.extractArray(this.state.problem.content, 3, 3)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={3}
								col_offset={6}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 6, 3)}
								fixedValue={this.extractArray(this.state.problem.content, 6, 3)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>
						</div>
						<div className="row">
							<Grid9x9
								row_offset={6}
								col_offset={0}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 0, 6)}
								fixedValue={this.extractArray(this.state.problem.content, 0, 6)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={6}
								col_offset={3}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 3, 6)}
								fixedValue={this.extractArray(this.state.problem.content, 3, 6)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>

							<Grid9x9
								row_offset={6}
								col_offset={6}
								handle_grid_1x1_click={this.handle_grid_1x1_click}
								value={this.extractArray(this.state.gridValues, 6, 6)}
								fixedValue={this.extractArray(this.state.problem.content, 6, 6)}
								selectedGrid={this.state.selectedGrid}
								conflicts={this.state.conflicts}
							/>
						</div>
					</div>
				)}
				{this.state.completeFlag ? <Fireworks {...fxProps} /> : null}
				{this.state.loading ? null : (
					<ScreenInputKeyBoard
						handleScreenKeyboardInput={this.handleScreenKeyboardInput}
					/>
				)}
			</>
		);
	}
}

export default Sudoku;
