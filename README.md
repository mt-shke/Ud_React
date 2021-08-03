## 1- Component-Driven User Interfaces
- React Core Syntax & JSX

## 2 - User Interaction & State
- Re-usable and reactive components
- Handling Events -> update UI & working with "State"

## 3 - Rendering Lists & Conditionnal Content
- Outputting Dynamic lists of content
- Rendering content under certain conditions

## 4 - Styling Components
- Conditional & Dynamic Styles
- Styled Components
- CSS Modules

## 5 - Debugging 
- Understanding Error Messages
- Working with Breakpoints
- Using React DevTools

## 6 - Fragments, Portals, Refs
- Jsx Limitations & Fragments  
	Wrapper React.Fragment

- Cleaner Dom with Portals  
	backdrop-root

- Refs  
	const inputNameRef= useRef(); ref={inputNameRef}  
	const enteredName = inputNameRef.current.value;  
	###### useRef -> uncontrolledComponent(using DOM by Ref) | useState -> controlledComponent(use props and callbackFunc like onChange)

## 7 - Effects, Reducers & Context
- Effects & Side Effects  
Dibounce  
	useEffect(() => {  
		const identifier = setTimeout(() => {  
			console.log("Checking form validity!");  
			setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);  
		}, 1000);  
		return () => {  
			console.log("Clean up");  
			clearTimeout(identifier);  
		};  
	}, [enteredEmail, enteredPassword]);

<details>
	<summary>- Managing Complex States with Reducers </summary>  
  
```js
	const emailReducer = (state, action) => {  
		if (action.type === "USER_INPUT") {  
			return { value: action.val, isValid: action.val.includes("@") };  
		}  
		if (action.type === "INPUT_BLUR") {  
			return { value: state.value, isValid: state.value.includes("@") };  
		}  
		return { value: "", isValid: false };  
	};  

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: undefined });

	const { isValid: emailIsValid } = emailState;

useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("running");
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 1000);
		return () => {
			console.log("ends");
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);


	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });
	
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};
	
	return (<input type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}  
```  
</details>  
  
- Managing App/Component-wide with Context




#### props.items

    		<Expense items={expenses} />

#### Component function Card() {

- const classes = "card " + props.className;
- return <div className={classes}>{props.children}</div>;
  }
  }

##### DOM Element onClick

##### const [titleToChange, setNewTitleFunction] = useState('');

setNewTitleFunction('New Title');

##### onAddExpenseData={addExpenseDataHandler}

##### Lifting State Up

##### Outputting Dynamic List of Content

##### Rendering Content Under Certain Conditions




