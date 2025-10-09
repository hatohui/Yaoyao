### Overall:

#### Context:

A restaurant table + orders management system

#### Objective:

Create an ordering system for each table via a link. Logic for the link can be found in #file:page.tsx

#### To implement:

Allow users who can successfully access this page (is table leader + correct table) order food for their table.

#### Constraints:

- Must separate all the logics from UI using hooks
- The code must be clean.
- Make sure all the features are translatable between four languages.
- Ask me if you want to implement something that is ground-breaking for the codebase.

#### Roles:

- User: View only.
- Table Leader: Manage ones own table (add/remove/order food)
- Yaoyao: The restaurant owner and manager

#### Repo info:

- refer to D:\Repos\Yaoyao\src\README.md

#### User stories:

- As a tabler leader I want to order food
- As a tabler leader I want to see and select foods too add to my order.
- As a tabler leader I want to see what my table ordered.
- As a tabler leader I want to remove foods I accidentally click
- As a tabler leader I want to add more than one order of a dish.
- As a tabler leader I want to see the full price for the whole table and price per pax.
- As an user I want to see what our table ordered.
- As yaoyao I want to see what each table ordered
- As yaoyao I want to mark a dish as not available.
- As an user I want to see if a dish is unavailable.
- As yaoyao I want to see what each table ordered and their total cost.
- As yaoyao I want to tick "paid" to each table so I can easily manage.
- As an user I want to see how much I need to pay.
- As yaoyao I want to be able to grab the link/create QR code for the table leaders for their order.
