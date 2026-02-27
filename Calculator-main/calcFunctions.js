let Calculator =
{
    txtResult: document.getElementById("txtResult"),
    FirstValue: null,
    SecoundValue: null,
    Operator: 0,
    Result: 0,
    IsCalculated: false,
    CurrentValues: [],
    ScreenValues: document.getElementById("allResults"),
    
    WriteTxt: function (btn)
    {
        let num = btn.value;

        if (this.txtResult.value === "" || this.IsCalculated)
        {
            this.txtResult.value = num;
            this.IsCalculated = false;
            return;
        }
        this.txtResult.value += num
    },
    
    OperatorClick: function (CurrentOperator)
    {
        if (this.txtResult.value==="" || this.IsCalculated)
        { alert("Enter Valied Number!"); return; }
        
        this.FirstValue = parseFloat(this.txtResult.value);
        this.Operator = CurrentOperator;
        this.txtResult.value = "";
        console.log(this.FirstValue)
        console.log(this.Operator)
    },

    EqualOperator: function ()
    {
        if (this.txtResult.value==="")
        {alert("Enter Valied Number!"); return;}
        if (this.Operator===0)
        {alert("Enter The Operator"); return;}

        
        this.SecoundValue = parseFloat(this.txtResult.value)
        switch(this.Operator)
        {
            case '1':
                this.Result = this.FirstValue / this.SecoundValue
                break;
            case '2':
                this.Result = this.FirstValue * this.SecoundValue
                break;
            case '3':
                this.Result = this.FirstValue - this.SecoundValue
                break;
            case '4':
                this.Result = this.FirstValue + this.SecoundValue
                break;
        }
        /* consol logs */
        console.log("1st: " + this.FirstValue)
        console.log("O: " + this.Operator)
        console.log("2nd: " + this.SecoundValue)
        console.log("R: " + this.Result)
        /* results */
        this.txtResult.value = this.Result
        this.IsCalculated = true
        this.CurrentValues.push(this.Result)

        this.ScreenValues.innerText = ''
        for (let i = 0; i < this.CurrentValues.length; i++)
        {
            this.ScreenValues.innerHTML+="<li>"+ this.CurrentValues[i] +"</li>"
        }
    },

    Clear: function ()
    {
        this.FirstValue = null
        this.SecoundValue = null
        this.Operator = 0
        this.Result = 0
        this.txtResult.value = ""
    },
    ResetAllValues: function ()
    {
        this.FirstValue = null
        this.SecoundValue = null
        this.Operator = 0
        this.Result = 0
        this.txtResult.value = ""
        this.CurrentValues = []
        this.ScreenValues.innerText = ''
        }
}