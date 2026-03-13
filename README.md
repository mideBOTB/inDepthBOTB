# inDepth

## What This Application Does

`inDepth` is an interactive product-demo web app built around an eBay-style shopping experience.
It is designed to show how users can:

- upload AI shopping evidence or product screenshots
- describe what they need in plain language
- browse by category or brand
- receive marketplace-style recommendations
- switch to a mock human agent when clarification is needed

The purpose of the application is to demonstrate a smarter, more personalized support and discovery flow for online shopping. It highlights how a user can move from confusion or broad search intent to clearer recommendations, brand filtering, category browsing, and human support when needed.

## Tech And Frameworks Used

This project is currently built as a lightweight front-end prototype using:

- `HTML` for the application structure
- `CSS` for layout, visual styling, and responsive design
- `JavaScript` for all interactivity, recommendation logic, personalization, form behavior, and mock human-agent responses
- `localStorage` for saving lightweight memory such as recent searches and user preference signals in the browser

The project also includes an optional serverless API scaffold in `api/audit.js` for future AI integration, but the main demo can run locally in the browser without requiring a backend.

## How Judges Should Navigate And Interpret The Application

Judges should think of `inDepth` as a working prototype that demonstrates the product experience, not a final production deployment.

Recommended flow:

1. Open `demo.html`.
2. In the `inDepth AI Search Tool` section, either:
   - upload a screenshot in `Step 1`, or
   - enter search details in `Step 2`, or
   - use both together.
3. Click `Send Message` to generate recommendations or audit feedback.
4. Review the `Conversation`, `Recommendations`, and `Personalization Signals` panels.
5. Click `Human Agent` to open the separate support panel and test the human-assistance flow.

What judges should notice:

- the app supports flexible search by need, category, and brand
- the recommendation output changes based on what the user enters
- the interface handles both self-service and human-support workflows
- the personalization panel shows how the system tracks useful shopping signals
- the product structure is meant to reflect a marketplace with many categories, similar to eBay

## Key Demo Areas

- `inDepth AI Search Tool`: the main user-facing discovery and recommendation flow
- `Recommendations`: the marketplace-style results returned from the current request
- `Personalization Signals`: live indicators such as favorite category, preferred brand, and budget handling
- `Human Agent`: a separate support mode that simulates agent-guided help when users want human clarification

## Files

- `demo.html` - standalone application UI
- `demo.css` - visual styling and responsive layout
- `demo-app.js` - live application logic
- `demo.js` - synced backup copy of the demo logic
- `api/audit.js` - optional future AI/serverless integration
