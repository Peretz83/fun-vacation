import { useEffect, useState } from "react";
import AddForm from "../components/AddForm";
import Title from "../components/Title";
import { VacationPackage } from "./Home";
import { addVacations, getVacations } from "../services/ApiService";

function Vacations() {
    const [vacations, setVacations] = useState<Array<VacationPackage>>([]);

    useEffect(() => {
        getVacations()
            .then(json => {
                setVacations(json);
            })
    }, []);

    function onAdd(vacation: VacationPackage) {
        addVacations(vacation)
            .then(json => {
                setVacations([
                    ...vacations,
                    json
                ])
            })
    }

    return (
        <>
            <Title
                mainText="Vacations"
                subText="manage vacation packages"
            />

            <AddForm onAdd={onAdd} />

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vacations.map(vacation =>
                        <tr key={vacation._id}>
                            <td>{vacation.date}</td>
                            <td>{vacation.location}</td>
                            <td>{vacation.price}</td>
                            <td>
                                <button className="btn btn-default">
                                    <i className="bi bi-pen" />
                                </button>
                                <button className="btn btn-default ms-2">
                                    <i className="bi bi-trash" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Vacations;