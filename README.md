# bamazon
A Node.js based cli clone of Amazon

# Ordering a Product

When a user starts the application, a list of available products and their associated information is displayed. The user can choose to submit an order for an a product, by providing the product id and the desired quantity. Once the order is submitted the application will submit the order and update the product quantity. 

![standardflow](https://user-images.githubusercontent.com/2763308/37527368-445ccc90-2908-11e8-8c41-11c47ab5dd40.gif)

#Error Conditions

## Ordering Invalid Products

If an invalid product id is supplied, the application will notify the user. The user will then be prompted to resubmit the order.

![id_not_exist](https://user-images.githubusercontent.com/2763308/37527371-472122aa-2908-11e8-8ba4-a3241a8cdd94.gif)

## Insufficient Quantity

The application will prompt the user to resubmit their order; If a user submits an order request, with a quantity that is higher than the available quantity for the product requested.

![insufficient_quantity](https://user-images.githubusercontent.com/2763308/37527377-4a76692e-2908-11e8-8628-10aaf2275aad.gif)

## Non-Numeric input

The user will be prompted to resubmit their order if they supply non-numeric input for the product id or the order quantity.