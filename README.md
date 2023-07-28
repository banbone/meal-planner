# Meal planner
I've had a subscription to recipe boxes for a while, but they're too expensive to carry on long term. I've kept the recipe cards and have written this simple cli app to generate a shopping list from recipes that you have selected.

```
First option must be a mode selector:
  -l,--list   List all available recipes   
  -i,--info   Info about a specific recipe
  -n,--new    New shopping list
  -h,--help   Print this message

Usage: meals -l|-i <i>|-n <i> ... <i>|-h
  -l                    Requires no input. Will list all available recipes
                        with their respective index number.

  -i <index>            When given an index number, information about the 
                        recipe will be printed including the ingredients. Use
                        the -l option to find the index number you need. 
  
  -n <index> ...        You must provide some index numbers of recipes,
                        separated by spaces. Use the -l option to find the 
                        index  of the recipe.  This will print  a list of  your
                        selected  recipes along  with a  combined shopping list
                        for everything you'll need.
  
  -n random <int>       A random list of recipes matching the length of the
                        int you provide will be generated along with a shopping
                        list for all of the required ingredients. Spicy.

Written by banbone                                            Fri 20th Jan 2023
```