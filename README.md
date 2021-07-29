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

##### Rendering List & Conditionnal content
key={expense.id}

# Styling Components

###### npm install --save styled-components

##### import styled from 'styled-components';

##### color : ${props => props.invalid ? 'black': 'red'};

##### CSS modules <div className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>

### Debugging errors

##### Breakpoints, ReactDev Tools


