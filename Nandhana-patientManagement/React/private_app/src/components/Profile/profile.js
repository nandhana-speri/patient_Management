import React, { useEffect, useState } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { loaderTrue, setProfile } from '../../action';
import Button from 'react-bootstrap/Button';
import HealthModal from './Modal';
import {
  deleteDiseaseAction,
  getHealthInformation,
  getdiseaseInformation,
} from './action';
import DiseaseFile from './DiseaseFile';
import ProfileEdit from './ProfileEdit';

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData,role } = useSelector((state) => state.commonReducer);
  const { healthInfo, diseaseInfo } = useSelector(
    (state) => state.profileReducer
  );
  console.log(healthInfo);
  const [modalShow, setModalShow] = useState(false);
  const [diseaseModalShow, setDiseaseModalShow] = useState(false);
  const [ProfileModalShow, setProfileModalShow] = useState(false);

  const deleteDisease = (e) => {
    console.log(e);
    dispatch(deleteDiseaseAction(e));
    dispatch(loaderTrue());
  };

  useEffect(() => {
    dispatch(setProfile());
    if(role ==='patient'){
    dispatch(getHealthInformation());
    dispatch(getdiseaseInformation());
    }
  }, []);
  return (
    <div>
     {role==='patient'?(
       <div class="profile card">
        <div class="profile-body">
          <h1 class="title d-flex">
            Profile
            <i
              class="fa fa-pen fa-xs edit"
              onClick={() => setProfileModalShow(true)}
            ></i>
            <ProfileEdit
              show={ProfileModalShow}
              onHide={() => setProfileModalShow(false)}
              mode="edit"
              data={profileData}
            />
          </h1>
          <table className="tables">
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{profileData?.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{profileData?.login?.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>:</td>
                <td>{profileData?.phoneNumber}</td>
              </tr>
              <tr>
                <td>Date of birth</td>
                <td>:</td>
                <td>{profileData?.dob}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>:</td>
                <td>{profileData?.address}</td>
              </tr>
              <tr>
                <td>Aadhar Number</td>
                <td>:</td>
                <td>{profileData?.aadharNumber}</td>
              </tr>
              <tr>
                <td>PinCode</td>
                <td>:</td>
                <td>{profileData?.pinCode}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>:</td>
                <td>{profileData?.state}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>):
      (<div class="profile card">
      <div class="profile-body">
        <h1 class="title d-flex">
          Profile
          <i
            class="fa fa-pen fa-xs edit"
            onClick={() => setProfileModalShow(true)}
          ></i>
          <ProfileEdit
            show={ProfileModalShow}
            onHide={() => setProfileModalShow(false)}
            mode="edit"
            data={profileData}
          />
        </h1>
        <table className="tables">
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>Nandhana</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{profileData?.email}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>:</td>
              <td>{profileData?.role}</td>
            </tr>
    
            
          
          
           
          </tbody>
        </table>
      </div>
    </div>)}
  
       {role !=='admin'?(
        <div>
         <div class="card">
          <h1 class="title d-flex">
            Health Information
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Edit
            </Button>
            {healthInfo === null ? (
              <HealthModal
                show={modalShow}
                mode="add"
                onHide={() => setModalShow(false)}
              />
            ) : (
              <HealthModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode="edit"
                data={healthInfo}
              />
            )}
          </h1>
          <div class="student-profile py-4">
            <div class="col-lg-8">
              <div class="cards-table shadow-sm">
                <div class="cards-body pt-0">
                  <table class="table table-bordered">
                    <tr>
                      <th width="30%">Blood</th>
                      <td width="2%">:</td>
                      <td>{healthInfo?.blood}</td>
                    </tr>
                    <tr>
                      <th width="30%">Height </th>
                      <td width="2%">:</td>
                      <td>{healthInfo?.height}</td>
                    </tr>
                    <tr>
                      <th width="30%">Weight</th>
                      <td width="2%">:</td>
                      <td>{healthInfo?.weight}</td>
                    </tr>
                    <tr>
                      <th width="30%">Gender</th>
                      <td width="2%">:</td>
                      <td>{healthInfo?.gender}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  
      <div class="card">
        <h1 class="title d-flex">
          Diseases
          <Button variant="primary" onClick={() => setDiseaseModalShow(true)}>
            Add
          </Button>
          <DiseaseFile
            show={diseaseModalShow}
            mode="add"
            onHide={() => setDiseaseModalShow(false)}
          />
        </h1>
        <div class="student-profile py-4">
          <div class="col-lg-8">
            <div class="cards-table shadow-sm">
              <div class="cards-body pt-0">
                <table class="table-disease">
                  <tr className="table-column">
                    <th className="table-row">Disease Name</th>
                    <th className="table-row">Start Date</th>
                    <th className="table-row">Remarks</th>
                    <th className="table-row">Delete</th>
                  </tr>
                  {diseaseInfo.map((e) => {
                    return (
                      <tr className="table-column">
                        <td className="table-row">{e?.diseaseList?.name}</td>
                        <td className="table-row">{e?.start_date}</td>
                        <td className="table-row">{e?.remarks}</td>
                        <Button
                          variant="primary"
                          onClick={() => deleteDisease(e?.id)}
                        >
                          Delete
                        </Button>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>):null}
    </div>
  );
};

export default Profile;
