<?php
namespace App\Dao;
use App\Models\User as User;
use App\Common\Crud as Crud;
use App\Dao\CommonDao as CommonDao;
use App\Dao\DaoInterface as DaoInterface;

class UsersDao extends CommonDao implements Crud, DaoInterface {

    function __construct() {
        
    }

    function setProperties($object, $inputArray) {
        if (isset($inputArray['first_name'])) {
            $object->first_name = $inputArray['first_name'];
        }
        if (isset($inputArray['last_name'])) {
            $object->last_name = $inputArray['last_name'];
        }
        if (isset($inputArray['gender'])) {
            $object->gender = $inputArray['gender'];
        }
        if (isset($inputArray['phone_number'])) {
            $object->phone_number = $inputArray['phone_number'];
        }
        
        if (isset($inputArray['password'])) {
            $object->password =  Hash::make($inputArray['password']);
        }
        return $object;
    }

    /**
     * 
     * 
     * @param type $request
     */
    function create($request) {
        
        if ($request['email']) {
            $user = User::where('email', $request['email'])->get();
            if ($user == null) {
                return false;
            }
        }


        $user = new User();
        $user = $this->setProperties($user, $request);
        $user->save();
        return $user;
    }

    function read($id) {
        $user = User::find($id);
        return $user;
    }

    function update($request) {
        $user = User::find($request['id']);
        if ($user) {
            $user = $this->setProperties($user, $request);
            $user->save();
            return $user;
        }
    }

    function delete($id) {
        User::destroy($id);
    }
    

    
    

}
