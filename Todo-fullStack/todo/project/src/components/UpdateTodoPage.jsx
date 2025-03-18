import React from 'react'

const UpdateTodoPage = () => {
  return (
    <div>
        <h1>Update Todo Page</h1>
        <form>
            <div className='text-center'>
                <label> Enter: description</label>
            <input type="text" name="description" placeholder="Description"/>
            </div>
            <div className='date'>
                <label>Enter Target date:
                </label>
            <input type="date" name="targetDate"/>
            </div>
              <div className="col-sm-10">
          <div class="form-check">
            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
            <label className="form-check-label" for="gridRadios1">
              Done 
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"></input>
            <label className="form-check-label" for="gridRadios2">
              Yet to be Done
            </label>
          
          </div>
        </div>
            </form>
      
    </div>
  )
}

export default UpdateTodoPage
