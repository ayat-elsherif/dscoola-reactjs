import React, { Suspense } from 'react';

// import LogPage from './components/login/LogPage';
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import MainProject from './components/containers/views/layouts/main';
// import Categories from "./pages/categories/Categories";
import ZoomSDKPage from './pages/ZoomSdk/ZoomSDKPage';
import SingleCategoryPage from './pages/categories/SingleCategoryPage';
import SingleSubCategoryPage from './pages/categories/SingleSubCategoryPage';
import SingleTopicCategoryPage from './pages/categories/SingleTopicCategoryPage';
import Video from './helpers/Video';
import Home from './components/containers/views/layouts/main/home';
import Rythm from './pages/rythm/Rythm';
import TopCoursesPage from './pages/topCourses/TopCoursesPage';
import TopViewedPage from './pages/mostViewed/TopViewedPage';
import WebinarsPage from './pages/webinars/WebinarsPage';
import CoursePreview from './components/containers/views/layouts/coursePreview/CoursePreview';
import BecomeInstructor from './pages/becomeInstructor/BecomeInstructor';
import SingleWebinar from './pages/webinars/SingleWebinar';
import YallaOnline from './pages/yallaOnline/YallaOnline';
import InstructorPage from './pages/instructors/instructor/InstructorPage';
import StudentPage from './pages/students/student/StudentPage';
import SingleGroupDetails from './pages/groups/SingleGroupDetails';
import ShoppingCart from './pages/Cart/ShoppingCart';
import CartCheckout from './pages/Cart/checkout/CartCheckout';
import Forgetpass from './components/login/forgetPass';
import Verifycode from './components/login/verifyCode';
import Resetpass from './components/login/resetPass';
import SignUp from './components/login/sign-up';
import SignIn from './components/login/sign-in';
import Passchangedpage from './components/login/passChangedPage';
// import ProtectedRoutes from './helpers/ProtectedRoutes';
import ContactUsPage from './pages/contactUs/ContactUsPage';
import BlogsPage from './pages/blogs/BlogsPage/BlogsPage';
import AboutUsPage from './pages/aboutUs/AboutUs';
import CareersPage from './pages/careers/CareersPage';
import PrivacyPolicyPage from './pages/privacyPolicy/PrivacyPolicyPage';
import HelpSupportPage from './pages/helpAndSupport/HelpSupportPage';
import TermsConditionsPage from './pages/termsAndConditions/TermsConditionsPage';
import SingleBlog from './pages/blogs/BlogsPage/singleBlog/SingleBlog';
import NotFoundPage from './pages/notFound/NotFoundPage';
import TooManyRequests from './pages/notFound/TooManyRequests';
import InstructorSign from './pages/becomeInstructor/InstructorSign';
import HelpSupportSingleFaq from './pages/helpAndSupport/HelpSupportSingleFaq';
import HelpSupportSingleByTopic from './pages/helpAndSupport/helpSupportSingleByTopic';
import HelpSupportSingleArticle from './pages/helpAndSupport/HelpSupportSingleArticle';
import CartDropdown from './helpers/dropdownCart/CartDropdown';
import NotificationPage from './pages/notification/NotificationPage';
import SearchResults from './pages/searchResults/SearchResults';

/*dashboard*/
import Loading from './components/common/dashboard/shared-components/Loading';
import { RequiredAuth } from './components/common/Routes/ProtectedRoutes';
import { Mywallet } from './pages/dashboard/myProfile/components/myWallet';
import Verification from 'components/login/verification';
import { CourseView } from 'pages/courses/CourseView';
import PaymentSuccessed from 'pages/PaymentSuccessed/PaymentSuccessed';
import MeetingDetails from 'pages/MeetingDetails/MeetingDetails';
import Coupons from 'pages/instrcutorDashboard/Coupons/Coupons';
import OwnScrollToTop from 'components/own/OwnScrollToTop';
import useScreens from 'Hooks/ui/useScreens';
import Courses from 'components/mobileView/myCourses/Courses';
export default function AppRoutesWrapper() {
  const Dashboard = React.lazy(() =>
    import('./components/containers/views/layouts/dashboard/Dashboard'),
  );
  const MyDashboard = React.lazy(() => import('./pages/dashboard/myDashboard'));
  const MyProfile = React.lazy(() => import('./pages/dashboard/myProfile'));
  const PersonalInformation = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/personalInformation'),
  );
  const WorkExperiences = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/workExperiences'),
  );
  const CreditCards = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/creditCards'),
  );
  const NotificationSettings = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/notificationSettings'),
  );
  const SecuritySettings = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/securitySettings'),
  );
  const LoginActivity = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/loginActivity'),
  );
  const DeactivateAccount = React.lazy(() =>
    import('./pages/dashboard/myProfile/components/deactivateAccount'),
  );
  const MyCourses = React.lazy(() => import('./pages/dashboard/myCourses'));
  const YallaOnlineList = React.lazy(() =>
    import('./pages/dashboard/yallaOnline'),
  );
  const OneToOne = React.lazy(() => import('./pages/dashboard/oneToOne'));
  const Certificates = React.lazy(() =>
    import('./pages/dashboard/certificates'),
  );
  const CertificateDetails = React.lazy(() =>
    import('./pages/dashboard/certificates/components/certificateDetails'),
  );
  const MyWishlist = React.lazy(() => import('./pages/dashboard/myWishlist'));
  // const PurchaseHistory = React.lazy(() =>
  //   import('./pages/dashboard/purchaseHistory')
  // );
  const ZoomSettings = React.lazy(() =>
    import('./pages/dashboard/meetingSettings/zoomSettings'),
  );
  const BigblueButtonSettings = React.lazy(() =>
    import('./pages/dashboard/meetingSettings/bigblueButtonSettings'),
  );
  const JitsiSettings = React.lazy(() =>
    import('./pages/dashboard/meetingSettings/jitsiSettings'),
  );
  const Invoices = React.lazy(() => import('./pages/dashboard/invoices'));
  const InvoiceDetails = React.lazy(() =>
    import('./pages/dashboard/invoices/components/invoiceDetails'),
  );
  /*Instructor Routes */
  const InstrctorHome = React.lazy(() =>
    import('./pages/instrcutorDashboard/home'),
  );
  const InstrctorCourses = React.lazy(() =>
    import('./pages/instrcutorDashboard/courses'),
  );
  const InstrctorAddCourse = React.lazy(() =>
    import('./pages/instrcutorDashboard/courses/components/createCourse'),
  );
  const InstrctorAddCourseStructure = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/courseStructure'
    ),
  );
  const InstrctorAddIntendedLearners = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/intendedLearners'
    ),
  );
  const InstrctorAddCourseDetails = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/courseDetails'
    ),
  );
  const InstrctorAddCourseFilm = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/film'
    ),
  );
  const CourseContent = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/courseContent'
    ),
  );
  const CoursePricing = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/coursePricing'
    ),
  );
  const PaymentMethods = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/coursePricing/paymentMethods'
    ),
  );
  const CourseSetting = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/CourseSetting'
    ),
  );
  const InstrctorCoursesTable = React.lazy(() =>
    import('./pages/instrcutorDashboard/courses/components/table'),
  );
  const InstrctorQA = React.lazy(() =>
    import('./pages/instrcutorDashboard/q&a'),
  );
  const OneOnOneList = React.lazy(() =>
    import('./pages/instrcutorDashboard/oneOnOne/oneOnOneList'),
  );
  // const StudentRequest = React.lazy(() =>
  //   import('./pages/instrcutorDashboard/oneOnOne/student-request')
  // );
  const OneOnOneSettings = React.lazy(() =>
    import('./pages/instrcutorDashboard/oneOnOne/oneOnOneSettings'),
  );
  const Annoncement = React.lazy(() =>
    import('./pages/instrcutorDashboard/annoncement'),
  );
  const Reviews = React.lazy(() =>
    import('./pages/instrcutorDashboard/reviews'),
  );

  const VideoChat = React.lazy(() => import('./pages/videoChat'));
  const OnGo = React.lazy(() => import('./pages/instrcutorDashboard/onGo'));
  const OnGoCourses = React.lazy(() =>
    import('./pages/instrcutorDashboard/onGo/components/courses'),
  );
  const OnGoCourseUnits = React.lazy(() =>
    import('./pages/instrcutorDashboard/onGo/components/courses/courseUnits'),
  );

  const WebinarsTalks = React.lazy(() =>
    import('./pages/instrcutorDashboard/webinarsTalks'),
  );
  const WebinarsTalksTable = React.lazy(() =>
    import('./pages/instrcutorDashboard/webinarsTalks/components/table'),
  );
  const WebinarsTalksAddMeeting = React.lazy(() =>
    import('./pages/instrcutorDashboard/webinarsTalks/components/form'),
  );

  const WebinarsTalksEditMeeting = React.lazy(() =>
    import('./pages/instrcutorDashboard/webinarsTalks/components/form'),
  );
  /*file Manager */
  const FileManager = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager'),
  );
  const FileManagerHome = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/home'),
  );
  const FileManagerFiles = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/myFiles'),
  );
  const FileManagerGoogleDrive = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/googleDrive'),
  );
  const FileManagerStarred = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/starred'),
  );
  const FileManagerShared = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/shared'),
  );
  const FileManagerRecovery = React.lazy(() =>
    import('./pages/instrcutorDashboard/fileManager/components/recovery'),
  );
  const Reports = React.lazy(() =>
    import('./pages/instrcutorDashboard/reports'),
  );
  const PremiumInstructor = React.lazy(() =>
    import(
      './pages/instrcutorDashboard/courses/components/createCourse/steps/coursePricing/PremiumInstructor'
    ),
  );
  const { isLg } = useScreens();
  return (
    <Router>
      <Routes exact>
        <Route
          path="/"
          exact
          element={
            <Suspense fallback="">
              <MainProject />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback="">
                {/* <RequiredAuth role="1"> */}
                <Home />
                {/* </RequiredAuth> */}
              </Suspense>
            }
          />
          <Route path="zoomsdk" element={<ZoomSDKPage />} />
          <Route path="video" element={<Video />} />
          <Route path="categories/:cat_id/:cat_name">
            <Route index element={<SingleCategoryPage category_view />} />
            <Route path=":subCat_id/:subCat_name">
              <Route index element={<SingleSubCategoryPage />} />
              <Route
                path=":topic_id/:topic_name"
                element={<SingleTopicCategoryPage topic_view />}
              />
            </Route>
          </Route>

          <Route
            path="course-view/:course_id/"
            exact
            element={<CourseView />}
          />

          <Route path="instuctor-preview" exact element={<CourseView />} />

          <Route
            path=":courseSlug/groups/:group_id"
            element={<SingleGroupDetails />}
          />
          <Route path="rythm" element={<Rythm />} />
          <Route path="topcourses" element={<TopCoursesPage />} />
          <Route path="livecourses/:course_id/" element={<CourseView />} />
          <Route path="topviewed" element={<TopViewedPage />} />

          <Route path="searchresult" element={<SearchResults />} />
          <Route path="webinars" exact>
            <Route index element={<WebinarsPage />} />
            <Route path=":slug" element={<SingleWebinar />} />
          </Route>

          <Route path="become-instructor">
            <Route index element={<BecomeInstructor />} />
            <Route path="register" element={<InstructorSign />} />
          </Route>
          <Route path="cart" exact>
            <Route index element={<ShoppingCart />} />
            <Route path="checkout" element={<CartCheckout />} />
          </Route>
          <Route path="meeting-details/:meetSlug/:meetId">
            <Route index element={<MeetingDetails />} />
          </Route>

          <Route path="yallaonline" element={<YallaOnline />} />
          <Route path="instructors">
            <Route path={':id'} element={<InstructorPage />} />
          </Route>
          <Route path="students">
            <Route
              path={':student_id'}
              element={
                <Suspense fallback="">
                  {/* <RequiredAuth role="3"> */}
                  <StudentPage />
                  {/* </RequiredAuth> */}
                </Suspense>
              }
            />
          </Route>
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="blogs">
            <Route index element={<BlogsPage />}></Route>
            <Route path=":articleSlug" element={<SingleBlog />}></Route>
          </Route>
          <Route path="about" element={<AboutUsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="support">
            <Route index element={<HelpSupportPage />} />
            <Route path="faq/:support_id" element={<HelpSupportSingleFaq />} />
            <Route path="topic/:support_id">
              <Route index element={<HelpSupportSingleByTopic />} />
              <Route
                path=":singletopic_article"
                element={<HelpSupportSingleArticle />}
              />
            </Route>
          </Route>
          <Route path="terms" element={<TermsConditionsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/429" element={<TooManyRequests />} />
          {!isLg && <Route path="/myCourses" element={<Courses />} />}
        </Route>

        {/* START */}
        <Route path="/login" element={<SignIn />}>
          {/* <Route path="signup" element={<SignUp />} /> */}
        </Route>
        <Route path="/forget-password" element={<Forgetpass />}></Route>
        <Route path="/payment-success" element={<PaymentSuccessed />}></Route>
        <Route path="/verify-code" element={<Verifycode />}></Route>
        <Route
          path="/reset-password/:resetToken"
          element={<Resetpass />}
        ></Route>
        <Route
          path="/successfully-pass-changed"
          element={<Passchangedpage />}
        ></Route>
        <Route
          path="/verification/:number/:id"
          element={<Verification />}
        ></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}>
          {/* <Route path="signin" exact element={<Login />} />
                    <Route path="signup" element={<SignUp />} /> */}
        </Route>
        <Route path="/auth/:provider" element={<SignIn />}></Route>

        <Route
          path="/video-chat"
          element={
            <Suspense fallback={<Loading cover="content" />}>
              <VideoChat />
            </Suspense>
          }
        />
        <Route
          path="student-dashboard"
          element={
            <Suspense fallback="">
              <RequiredAuth role="3">
                <Dashboard />
              </RequiredAuth>
            </Suspense>
          }
        >
          <Route index element={<MyDashboard />} />
          <Route
            path="mydashboard"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyDashboard />
              </Suspense>
            }
          />
          <Route
            path="my-profile"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyProfile />
              </Suspense>
            }
          >
            <Route index element={<PersonalInformation />} />
            <Route
              path="personal-information"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <PersonalInformation />
                </Suspense>
              }
            />
            <Route
              path="credit-cards"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <CreditCards />
                </Suspense>
              }
            />
            <Route
              path="my-wallet"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <Mywallet />
                </Suspense>
              }
            />
            <Route
              path="notification-settings"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <NotificationSettings />
                </Suspense>
              }
            />
            <Route
              path="security-settings"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <SecuritySettings />
                </Suspense>
              }
            />
            <Route
              path="login-activity"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <LoginActivity />
                </Suspense>
              }
            />

            <Route
              path="deactivate-account"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <DeactivateAccount />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="my-courses"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyCourses />
              </Suspense>
            }
          />
          <Route
            path="yalla-online"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <YallaOnlineList />
              </Suspense>
            }
          />
          <Route
            path="one-to-one"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OneToOne />
              </Suspense>
            }
          />

          <Route
            path="certificates"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <Certificates />
              </Suspense>
            }
          />
          <Route
            path={'certificates/:id'}
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <CertificateDetails />
              </Suspense>
            }
          />
          <Route
            path="my-wishlist"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyWishlist />
              </Suspense>
            }
          />
          {/* <Route
          path='purchase-history'
          element={
            <Suspense fallback={<Loading cover="content" />}>
              <PurchaseHistory />
            </Suspense>
          }
        /> */}

          <Route
            path="zoom-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <ZoomSettings />
              </Suspense>
            }
          />
          <Route
            path="bigblue-button-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <BigblueButtonSettings />
              </Suspense>
            }
          />
          <Route
            path="jitsi-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <JitsiSettings />
              </Suspense>
            }
          />
          <Route
            path="invoices"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <Invoices />
              </Suspense>
            }
          />
          <Route
            path={'invoices/:id'}
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <InvoiceDetails />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="instructor-dashboard"
          element={
            <Suspense fallback="">
              <RequiredAuth role="2">
                <Dashboard />
              </RequiredAuth>
            </Suspense>
          }
        >
          <Route index element={<InstrctorHome />} />
          <Route
            path="my-wishlist"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyWishlist />
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <InstrctorHome />
              </Suspense>
            }
          />
          <Route
            path="my-profile"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <MyProfile />
              </Suspense>
            }
          >
            <Route index element={<PersonalInformation />} />
            <Route
              path="personal-information"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <PersonalInformation />
                </Suspense>
              }
            />
            <Route
              path="work-experiences"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <WorkExperiences />
                </Suspense>
              }
            />
            <Route
              path="credit-cards"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <CreditCards />
                </Suspense>
              }
            />
            <Route
              path="my-wallet"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <Mywallet />
                </Suspense>
              }
            />
            <Route
              path="notification-settings"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <NotificationSettings />
                </Suspense>
              }
            />
            <Route
              path="security-settings"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <SecuritySettings />
                </Suspense>
              }
            />
            <Route
              path="login-activity"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <LoginActivity />
                </Suspense>
              }
            />

            <Route
              path="deactivate-account"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <DeactivateAccount />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="courses"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <InstrctorCourses />
              </Suspense>
            }
          >
            <Route index element={<InstrctorCoursesTable />} />
            <Route
              path="premium-instructor"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <PremiumInstructor />
                </Suspense>
              }
            />
            <Route
              path="add"
              element={
                <Suspense fallback="">
                  <InstrctorAddCourse />
                </Suspense>
              }
            >
              <Route
                path="course-structure"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <InstrctorAddCourseStructure />
                  </Suspense>
                }
              />
              <Route
                path="goals"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <InstrctorAddIntendedLearners />
                  </Suspense>
                }
              />
              <Route
                path="setup"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <InstrctorAddCourseDetails />
                  </Suspense>
                }
              />
              <Route
                path="film"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <InstrctorAddCourseFilm />
                  </Suspense>
                }
              />
              <Route
                path="course-content"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <CourseContent />
                  </Suspense>
                }
              />

              <Route
                path="course-pricing"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <CoursePricing />
                  </Suspense>
                }
              />
              <Route
                path="course-pricing/payment-method"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <PaymentMethods />
                  </Suspense>
                }
              />

              <Route
                path="course-setting"
                element={
                  <Suspense fallback={<Loading cover="content" />}>
                    <CourseSetting />
                  </Suspense>
                }
              />
            </Route>{' '}
            {/* <Route
            path='course/:id/edit'
            element={<WebinarsTalksEditMeeting />}
          /> */}
          </Route>
          {/* <Route path="course/preview/" element={<CoursePreview />} /> */}
          {/* <Route path="tryhover" element={<CartDropdown />} /> */}
          <Route
            path="q&a"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <InstrctorQA />
              </Suspense>
            }
          />
          <Route
            path="One-on-one-list"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OneOnOneList />
              </Suspense>
            }
          />
          {/* <Route
          path='student-request'
          element={
            <Suspense fallback={<Loading cover="content" />}>
              <StudentRequest />
            </Suspense>
          }
        /> */}
          {/* <Route
          path='/video-chat'
          element={
            <Suspense fallback={<Loading cover="content" />}>
              <VideoChat />
            </Suspense>
          }
        /> */}
          <Route
            path="on-go"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OnGo />
              </Suspense>
            }
          />
          <Route
            path="on-go/courses"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OnGoCourses />
              </Suspense>
            }
          />
          <Route
            path="on-go/courses/:id/units"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OnGoCourseUnits />
              </Suspense>
            }
          />
          <Route
            path="webinars-talks"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <WebinarsTalks />
              </Suspense>
            }
          >
            <Route index element={<WebinarsTalksTable />} />
            <Route
              path="meeting/add"
              element={<WebinarsTalksAddMeeting />}
            />{' '}
            <Route
              path="meeting/:id/edit"
              element={<WebinarsTalksEditMeeting />}
            />
          </Route>
          <Route
            path="file-manager"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <FileManager />
              </Suspense>
            }
          >
            <Route index element={<FileManagerHome />} />
            <Route
              path="home"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerHome />
                </Suspense>
              }
            />
            <Route
              path="my-files"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerFiles />
                </Suspense>
              }
            />
            <Route
              path="google-drive"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerGoogleDrive />
                </Suspense>
              }
            />
            <Route
              path="starred"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerStarred />
                </Suspense>
              }
            />
            <Route
              path="shared"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerShared />
                </Suspense>
              }
            />
            <Route
              path="Recovery"
              element={
                <Suspense fallback={<Loading cover="content" />}>
                  <FileManagerRecovery />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="reports"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <Reports />
              </Suspense>
            }
          />
          <Route path="coupons" element={<Coupons />} />
          <Route
            path="zoom-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <ZoomSettings />
              </Suspense>
            }
          />
          <Route
            path="bigblue-button-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <BigblueButtonSettings />
              </Suspense>
            }
          />
          <Route
            path="jitsi-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <JitsiSettings />
              </Suspense>
            }
          />
          <Route
            path="one-on-one-settings"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <OneOnOneSettings />
              </Suspense>
            }
          />
          <Route
            path="annoncement"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <Annoncement />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<Loading cover="content" />}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        <Route
          // path="course/:course_id/preview/:lecture_id"
          path="course/:course_slug/:course_id/section/:section_id/preview/:lecture_id"
          // path="course/preview"
        >
          <Route index element={<CoursePreview />} />
          <Route path="Q&A">
            <Route index element={<CoursePreview tab="Q&A" />} />
            <Route path=":questionId" element={<CoursePreview tab="Q&A" />} />
          </Route>
          <Route path=":tab" element={<CoursePreview />} />
        </Route>
        <Route path="/tryhover" element={<CartDropdown />} />
        <Route
          path="instuctor-preview/:course_id"
          exact
          element={<CourseView />}
        />
      </Routes>
      <OwnScrollToTop />
    </Router>
  );
}
