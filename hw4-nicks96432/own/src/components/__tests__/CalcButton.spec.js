import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CalcButton from "../CalcButton";
configure({ adapter: new Adapter() });

it("can assign extra class to button", () => {
	const element = mount(<CalcButton className="extra">1</CalcButton>);

	expect(element.find("button").prop("className")).toMatch(/extra/);
});

it("call props.onClick when button be clicked", () => {
	const onClick = jest.fn();
	const element = mount(<CalcButton onClick={onClick}>1</CalcButton>);

	const button = element.find("button");
	button.simulate("click");

	expect(onClick).toBeCalled();
});
