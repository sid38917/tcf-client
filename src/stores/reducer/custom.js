//this is the inital state of the data, which stores the customization data,
//such as the measurement data,fabric data, customization data
//additionally, there is the product of the suits, which is passed on as params
//this is referred to as dataCustom. which is passed as a prop on other pages
//this state will continue updating with the redux actions, when the user has 
//inputted their data
const initialState = {
  data: [
    {
      fabric: "",
      customize: [],
      measurement: [],
      product: "suits",
    },
    {
      fabric: "",
      customize: [],
      measurement: [],
      product: "shirts",
    },
    {
      fabric: "",
      customize: [],
      measurement: [],
      product: "trousers",
    },
    {
      fabric: "",
      customize: [],
      measurement: [],
      product: "jacket",
    },
  ],
};

const CustomReducer = (state = initialState, action) => {
  if (action.type === "SET_FABRIC") {
    //the product(suit, shirt, trousers, jacket) is obtained through the params from react router
    //the state.data is checked if its empty, and if it is, the product, and fabric data 
    //is then pushed into the newData variable. otherwise, found checks if the product is chosen
    //if there is no product chosen, then the newData variable is updated with the data from the state
    //and the product, and the payload, which is the fabric data is passed from the SetFabric action
    //otherwise if found is true, then the state.data is mapped, in newData to update newData 
    //with the fabric data obtained from the SetFabric action. Finally, the state is spread using the spread function
    //and the data within the state is then updated with the newData  
    const { product } = action.params;
    let newData = [];
    if (state.data.length === 0) {
      newData.push({
        product: product,
        fabric: action.payload,
      });
    } else {
      const found = state.data.find((item) => item.product === product);
      if (!found) {
        newData = state.data;
        newData.push({
          product: product,
          fabric: action.payload,
        });
      } else {
        newData = state.data.map((item) => {
          if (item.product === product) {
            item.fabric = action.payload;
          }
          return item;
        });
      }
    }
    console.log(newData, "new data");
    return {
      ...state,
      data: newData,
    };

    //this is for the customization action
  } else if (action.type === "SET_CUSTOMIZE") {
    const { product } = action.params;
    let newStateData = [];
    if (state.data.length === 0) {
      newStateData.push({
        product: product,
        customize: [action.payload], //since everything is stored in an array for the customizations, therefore the data is added to the array
      });
    } else {
      const found = state.data.find((item) => item.product === product); //finds the item.product and product, and if it is found it repeats a smiliar action
      if (!found) {
        newStateData = state.data;
        newStateData.push({
          product: product,
          customize: [action.payload],
        });
      } else {
        newStateData = state.data.map((p) => {
          if (p.product === product) {
            if (p.customize.length === 0) {
              p.customize = [action.payload];
            } else {
              const foundCustomize = p.customize.find(
                (c) => c.name === action.payload.name
              );
              let newCustomize = p.customize;
              if (!foundCustomize) {
                newCustomize.push(action.payload);
              } else {
                newCustomize = p.customize.map((c) => {
                  if (c.name === action.payload.name) {
                    c.option = action.payload.option;
                    c.image = action.payload.image;
                  } else {
                  }
                  return c;
                });
              }
              p.customize = newCustomize;
            }
            return p;
          } else {
            return p;
          }
        });
      }
    }

    console.log("customize ===>", newStateData);

    return {
      ...state,
      data: newStateData,
    };
  } else if (action.type === "SET_MEASUREMENT") {
    console.log("REDUCER MEASUREMENT", action.payload, action.params);
    const { product } = action.params;
    let newStateData = [];
    if (state.data.length === 0) {
      newStateData.push({
        product: product,
        measurement: [action.payload],
      });
    } else {
      const found = state.data.find((item) => item.product === product);
      if (!found) {
        newStateData = state.data;
        newStateData.push({
          product: product,
          measurement: [action.payload],
        });
      } else {
        newStateData = state.data.map((p) => {
          if (p.product === product) {
            if (!p.measurement) {
              p.measurement = [action.payload];
            } else {
              const foundMeasurement = p.measurement.find(
                (c) => c.name === action.payload.name
              );
              let newMeasurement = p.measurement;
              if (!foundMeasurement) {
                newMeasurement.push(action.payload);
              } else {
                newMeasurement = p.measurement.map((c) => {
                  if (c.name === action.payload.name) {
                    c.value = action.payload.value;
                  } else {
                  }
                  return c;
                });
              }
              p.measurement = newMeasurement;
            }
            return p;
          } else {
            return p;
          }
        });
      }
    }
    console.log(newStateData, "new state data");
    return {
      ...state,
      data: newStateData,
    };

    //the fix value measurement, checks if the option is standard, and if it is
    //it deletes the manual data, and keeps the standard sizing data, and vice versa. 
  } else if (action.type === "FIX_VALUE_MEASUREMENT") {
    const { product } = action.params;
    console.log("fix value", action.payload, action.params);
    let newData = [];

    if (action.payload === "standard") {
      newData = state.data.map((item) => {
        if (item.product === product) {
          const newMeasurement = item.measurement.filter(
            (m) => m.name === "FIT" || m.name === "SIZE"
          );
          item.measurement = newMeasurement;
        }
        return item;
      });
    } else if (action.payload === "manual") {
      newData = state.data.map((item) => {
        if (item.product === product) {
          const newMeasurement = item.measurement.filter(
            (m) => m.name !== "FIT" && m.name !== "SIZE"
          );
          item.measurement = newMeasurement;
        }
        return item;
      });
      console.log("new Data", newData);
      return {
        ...state,
        data: newData,
      };
    }
  } else if (action.type === "RESET_CUSTOM") {
    let newStateData = [];
    if (action.payload) {
      newStateData = state.data.map((item) => {
        if (action.payload === item.product) {
          item = {
            fabric: "",
            customize: [],
            measurement: [],
            product: action.payload,
          };
        }

        return item;
      });
    } else {
      newStateData = initialState.data;
    }
    console.log("newdata redset", newStateData);
    console.log("reducer", newStateData);

    return {
      ...state,
      data: newStateData,
    };
  }
  return state;
};

export default CustomReducer;
