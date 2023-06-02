// @ts-nocheck
import React, { useState } from "react";
import { UserDocument } from "@customTypes/users";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { banUser, selectResponse } from "features/userSlice";
import { selectUser as selectLoggedInUser } from "features/authSlice";

const ExpandUser = ({ user }: { user: UserDocument }) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(selectLoggedInUser);
  const response = useAppSelector(selectResponse);


  const onBanUser = () => {
    dispatch(
      banUser({
        id: user._id,
        token: accessToken,
        user: { isBanned: !user.isBanned },
      })
    );
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-2 w-full '>
        <p>Admin:</p>
        <p>{`${user.isAdmin ? "Yes" : "No"}`}</p>
      </div>
      <div className='flex justify-between w-full '>
        <div className="flex gap-2">
          <p>Banned:</p>
          <p>{`${user.isBanned ? "Yes" : "No"}`}</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor='ban-checkbox'>
            {user.isBanned ? "Unban:" : "Ban:"}
          </label>
          <input
            type='checkbox'
            name='isBanned'
            id='ban-checkbox'
            checked={user.isBanned}
            onChange={onBanUser}
            className='cursor-pointer'
          />
        </div>
      </div>
      <div className='flex gap-2 w-full '>
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
      <div className='flex gap-2 w-full '>
        <p>Joined on:</p>
        <p>{user.createdAt}</p>
      </div>
      {user.address && (
        <div className='flex gap-2 w-full '>
          <p>Address:</p>
          <p>{user.address}</p>
        </div>
      )}
    </div>
  );
};

export default ExpandUser;
