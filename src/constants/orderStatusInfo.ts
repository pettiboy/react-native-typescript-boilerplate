export const orderStatusInfo = {
  "-2": {
    "text": "Cancelled",
    "description": "Cancelled by buyer",
    "color": "rgb(255,105,97)", 
    "icon": "new-releases"
  },
  "-1": {
    "text": "Declined",
    "description": "Declined by Chef",
    "color": "rgb(255,105,97)",
    "icon": "new-releases"
  },

  "0": {
    "text": "Incomplete",
    "description": "Incorrect status code",
    "color": "rgb(255,105,97)",
    "icon": "new-releases"
  },

  "1": {
    "text": "Received",
    "description": "Kindly respond at the earliest",
    "color": "rgb(100, 149, 237)",
    "icon": "article"
  },
  
  "2": {
    "text": "Preparing",
    "description": "Order is being prepared",
    "color": "rgb(149,125,173)",
    "icon": "outdoor-grill"
  },

  "3": {
    "text": "Delivering",
    "description": "Food is out for delivery",
    "color": "rgb(100, 149, 237)",
    "icon": "directions-bike"
  },

  "4": {
    "text": "Delivered",
    "description": "This order has been delivered to the customer's doorstep!",
    "color": "rgb(0,163,0)",
    "icon": "done-all"
  }
}
  

export const orderStatusInfoArr = [
  {
    "color":"rgb(255,105,97)",
    "description":"Incorrect status code",
    "icon":"new-releases",
    "id":0,
    "text":"Incomplete"
  },
  {
    "color":"rgb(100, 149, 237)",
    "description":"Kindly respond at the earliest",
    "icon":"article",
    "id":1,
    "text":"Received"
  },
  {
    "color":"rgb(149,125,173)",
    "description":"Order is being prepared",
    "icon":"outdoor-grill",
    "id":2,
    "text":"Preparing"
  },
  {
    "color":"rgb(100, 149, 237)",
    "description":"Food is out for delivery",
    "icon":"directions-bike",
    "id":3,
    "text":"Delivering"
  },
  {
    "color":"rgb(0,163,0)",
    "description":"This order has been delivered to the customer's doorstep!",
    "icon":"done-all",
    "id":4,
    "text":"Delivered"
  },
  {
    "color":"rgb(255,105,97)",
    "description":"Cancelled by buyer",
    "icon":"new-releases",
    "id":-2,
    "text":"Cancelled"
  },
  {
    "color":"rgb(255,105,97)",
    "description":"Declined by Chef",
    "icon":"new-releases",
    "id":-1,
    "text":"Declined"
  }
]