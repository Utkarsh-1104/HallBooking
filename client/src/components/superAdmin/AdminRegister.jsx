import { useRecoilState } from "recoil"
import { designationAtom, fnameAtom, lnameAtom, passwordAtom, roleAtom, usernameAtom } from "../../atoms/adminRegisterAtoms"

const AdminRegister = () => {

    const [fname, setfname] = useRecoilState(fnameAtom) 
    const [lname, setlname] = useRecoilState(lnameAtom)
    const [username, setusername] = useRecoilState(usernameAtom)
    const [password, setpassword] = useRecoilState(passwordAtom)
    const [role, setrole] = useRecoilState(roleAtom)
    const [designation, setdesignation] = useRecoilState(designationAtom)

    console.log(fname);
  return (
    <div className="text-white ">
        <div className="h-fit w-fit flex flex-col items-center ">
            <h1 className="text-3xl ">Add Admins</h1>
            <p className="text-xl font-[100] pt-2 ">Add new admins to the system. </p>
            <div className="flex gap-6 mt-8">
                <input type="text" placeholder="First Name" className="w-80 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={fname} onChange={ (e) => (setfname(e.target.value)) } />
                <input type="text" placeholder="Last Name" className="w-80 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={ (e) => (setlname(e.target.value)) } />
            </div>
            <div className="flex gap-6 mt-6 ">
                <input type="text" placeholder="Username" className="w-80 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={ (e) => (setlname(e.target.value)) } />
                <input type="password" name="adminPass" placeholder="Password" id="adminPass" className="w-80 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none" value={lname} onChange={ (e) => (setlname(e.target.value)) } />
            </div>
            <div className="flex gap-6 mt-6 ">
                <select name="role" id="role" className="w-80 h-12 ps-3 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={ (e) => (setlname(e.target.value)) }>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                </select>
                <input type="text" placeholder="Designation" className="w-80 h-12 ps-3 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={ (e) => (setlname(e.target.value)) } />
            </div>
            <button className="w-96 h-16 mt-10 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none " type="submit">Register Admin</button>
        </div>
    </div>
  )
}

export default AdminRegister