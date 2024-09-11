import { MIN_PASSWORD_LENGTH } from '@/common/constants';

export default {
  'header.links.sign-in': 'Sign in',
  'header.links.sign-up': 'Sign up',
  'header.button.sign-out': 'Sign out',

  'main.welcome': 'Welcome, please sign in.',
  'main.signed-in': 'Welcome back, {name}!',
  'main.title': 'REST/GraphiQL client',
  'main.links.rest': 'REST Client',
  'main.links.graphiql': 'GraphiQL Client',
  'main.links.history': 'History',
  'main.links.sign-in': 'Sign in',
  'main.links.sign-up': 'Sign up',
  'main.project': 'Project information',
  'main.project-info':
    'Developed as the final assignment for a React course, this project showcases the coordinated effort of three dedicated participants.\nCompleted within a span of four weeks, the application is a result of the team’s hard work and collaboration.\nThe application supports both RESTful and GraphQL APIs, featuring Firebase authentication, request history tracking, and language switching.\nUsers can configure and send requests, view responses.',
  'main.team.name-1': 'Ivan Zhirebny',
  'main.team.role-1': 'Frontend-developer, Team leader',
  'main.team.contributions-1': 'Dev environment setup, Authentication, Firebase, GraphQL',
  'main.team.bio-1':
    'Graduated from the Bauman Moscow State Technical University, completed the Frontend Developer program at the HTML Academy',
  'main.team.name-2': 'Vadim Kolymbet',
  'main.team.role-2': 'Frontend-developer',
  'main.team.contributions-2': 'Routing, Internationalization, Testing',
  'main.team.bio-2':
    'Graduated from the Saratov State University, studied at the Faculty of Computer Science and Information Technologies and in the Department of Computer Security and Cryptography Theory. Graduated from layout courses at Frontendblok. Worked as a T-SQL developer',
  'main.team.name-3': 'Aleksandra Bodnar',
  'main.team.role-3': 'Frontend-developer, Scrum-master',
  'main.team.contributions-3': 'Design, Jira, MUI, REST, History page, Welcome page',
  'main.team.bio-3':
    'Graduated from the Immanuel Kant Baltic Federal University, studied at the Faculty of Business Informatics. Graduated from 3WC courses with a degree in Frontend-development. Built PHP-driven features for 1C CRM',
  'main.rs-1':
    'RSSchool is an online educational community focused on web development and programming, offering well-structured courses for both beginners and experienced developers.',
  'main.rs-2':
    'Renowned for its high-quality education, RSSchool provides a comprehensive curriculum covering everything from basic HTML, CSS, and JavaScript to advanced technologies like React and Node.js. The school emphasizes project-based learning, enabling students to build real-world projects and develop impressive portfolios.',
  'main.rs-3':
    'RSSchool thrives on a vibrant community of volunteers, including seasoned developers and alumni, who mentor and support new learners.',

  'teamMember.role': 'Role',
  'teamMember.contributions': 'Contributions',
  'teamMember.bio': 'Short bio',
  'teamMember.techStack': 'Tech stack: ',

  'sign-in.loader': 'Signing in...',
  'sign-in.title': 'Sign in',
  'sign-in.email': 'Email',
  'sign-in.password': 'Password',
  'sign-in.submit': 'Sign in',

  'sign-up.loader': 'Signing up...',
  'sign-up.title': 'Sign up',
  'sign-up.name': 'Name',
  'sign-up.email': 'Email',
  'sign-up.password.title': 'Password',
  'sign-up.password': 'Enter password',
  'sign-up.password.confirm': 'Confirm password',
  'sign-up.submit': 'Sign up',

  'rest.title': 'REST Client',
  'rest.endpoint': 'Endpoint URL',
  'rest.params': 'Params',
  'rest.body.title': 'Body: ',
  'rest.body': 'Body',
  'rest.response': 'Response',
  'rest.status': 'Status:',

  method: 'Method',

  'headers.subtitle': 'Headers:',
  'headers.row': '+ row',
  'headers.key': 'Key',
  'headers.value': 'Value',

  'graphiql.title': 'GraphiQL Client',
  'graphiql.endpoint': 'Endpoint URL',
  'graphiql.sdl': 'SDL URL',
  'graphiql.params': 'Params',
  'graphiql.query.title': 'Query: ',
  'graphiql.query': 'Query',
  'graphiql.variables.title': 'Variables: ',
  'graphiql.variables': 'Variables',
  'graphiql.response': 'Response',
  'graphiql.status': 'Status:',
  'graphiql.body.title': 'Body:',

  'history.title': 'History',
  'history.empty.title': 'You haven’t executed any requests',
  'history.empty': 'It’s empty here. Try: ',
  'history.links.rest': 'REST Client',
  'history.links.graphiql': 'GraphiQL Client',
  'history.subtitle': 'Requests:',

  'error.title': 'Oops!',
  'error.text': 'Sorry, an unexpected error has occurred.',
  'error.desc': 'Error message:',
  'error.recommendation': 'Please try to refresh the page.',
  'error.refresh': 'Refresh the page',

  '404.message': 'The page you requested was not found.',
  '404.back': 'Previous page',
  '404.main': 'Main page',

  'auth.loading': 'Loading Firebase...',
  'auth.expired': 'Your token has expired, please sign in again',
  'auth.redirect': 'Redirecting...',

  'firebase.sign-out.success': 'You have been signed out',
  'firebase.sign-in.success': 'Successfully signed in with {email}!',
  'firebase.sign-up.success': 'Successfully signed up {name}!',
  'firebase.errors.USER_DISABLED': 'User disabled',
  'firebase.errors.INVALID_LOGIN_CREDENTIALS': 'Invalid credentials',
  'firebase.errors.EMAIL_EXISTS': 'Email already in use',
  'firebase.errors.TOO_MANY_ATTEMPTS_TRY_LATER': 'Too many authentication requests',

  'validation.email.required': 'Email is required',
  'validation.email.format': 'Email must have valid format',
  'validation.password.required': 'Password is required',
  'validation.password.number': 'Password must contain a number',
  'validation.password.uppercase': 'Password must contain an uppercase letter',
  'validation.password.lowercase': 'Password must contain a lowercase letter',
  'validation.password.special': 'Password must contain one of: -+/%*:#@\\$!?|^&',
  'validation.password.min': `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  'validation.name.required': 'Name is required',
  'validation.name.capital': 'Name must start with a capital letter',
  'validation.confirm.required': 'Please confirm your password',
  'validation.confirm.match': 'Passwords do not match',
} as const;
