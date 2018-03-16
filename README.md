# bamazon
A Node.js based cli clone of Amazon

# Ordering a Product

When a user starts the application, a list of available products and their associated information is displayed. The user can choose to submit an order for an a product, by providing the product id and the desired quantity. Once the order is submitted the application will submit the order and update the product quantity. 

![tandardFlo](/Users/school/Desktop/standardFlow.gif)



#Error Conditions

##Ordering Invalid Products

If an invalid product id is supplied, the application will notify the user. The user will then be prompted to resubmit the order.

# ![d_not_exis](/Users/school/Desktop/id_not_exist.gif)

##Insufficient Quantity

The application will prompt the user to resubmit their order; If a user submits an order request, with a quantity that is higher than the available quantity for the product requested.

![nsufficient_quantit](/Users/school/Desktop/insufficient_quantity.gif)

## Non-Numeric input

The user will be prompted to resubmit their order if they supply non-numeric input for the product id or the order quantity.