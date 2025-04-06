import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
//////////////////////////////////////////////////////// FIREBASE
import './firebase/FirebaseInit.js'
///////////////////////////////////////////////////////////// CSS 
import './styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
///////////////////////////////////////////////////////// COMPONENTS
import Main from './components/Main/Main'
/*
COMPONENTS MAP
- App
  - Main
    - Routes
      - HomePage
        - LearnButton
        - CollectionButton
        - AboutButton
        - SwipeableDrawerComponent
          - DraftsTab
          - LearnTab
          - CollectionTab
          - AboutTab
          - LogoutTab
        - SignInDialog
      - About
      - DisplayAllBlogs
        - LoadingComponent
        - BlogItem
          - Title
          - Subtitle
          - PublishInfo
          - ReadButton
          - Like
          - Bookmark
          - SignInDialog
      - ReadBlog
        - DisplayTitleComponent
          - MenuComponent
            - DeleteBlogDialog
        - Editor
      - DisplayCollection
        - CollectionsTab
        - DisplayLikes
        - DisplayBookmarks
      - NoMatchComponent
      - MyDrafts
      - EditorComponent
        - TextToolbar
          - CreateLinkButton
            - AddLinkDialog 
          - DeleteBlogDialog
        - TitleComponent
        - PublishButton
*/

function App() {
  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App;
