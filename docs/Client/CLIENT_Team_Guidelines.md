# PATTERN TO WORK WITH REACT

## ALL TEAM WILL WORK WITH THE SAME PATTERN

1. **HOOKS** WITH ARROW FUNCTION COMPONENTS
2. DESTRUCTION IN COMPONENTS BECAUSE WE WANT TO KNOW WHAT PROPERTIES USE IN EVERY COMPONENT (DONT USE PROPS)
3. PER FOLDER WE WILL CREATTE AN CSS FILE WITH NAME --->[name_folder].module.css (PER FILE AS LAYOUT COMPONENT)
4. FILES NAME WITH---> LOWERCASE(AS EXAMPLE layout).
5. FOLDER NAME WITH Capitalize IN EVERY DIFFERENT WORD USE UPPERCASE (AS EXAMPLE Layout.js)
6. MAYBE !!EVERY MEMBER OF TEAM WORK IN THEIR BRANCH PUSH THEN FOLLOW CODE REVIEW AND MERGE WITH MASTER
7. IN EVERY GIT PULL MAKE NPM INSTALL BECAUSE OF WE INSTALL NEW DEPENDENCIES ALL MEMBERS MUST KNOW ABOUT THIS
8. ALL CSS MUST BE WITH FLEXBOX FOR BETTER RESPONSIVENESS
9. We will use axios for fetch data and cleanup method to manage XHR requests for making cleanup
10. We all use interface IProps and in component :React.FC<IProps>=({destruction}) in all components as TextInput.tsx
11. We export default in components
12. Create in every folder the .stories.tsx for testing

## IF YOU WANT TO MAKE REACT.LAZY FOR IMPORT AN export const (NO DEFAULT ) you must use//

etc.
const BuildingPay = lazy(() =>
import("pages/buildings/BuildingPay").then(({ BuildingPay }) => ({
default: BuildingPay,
}))
);
