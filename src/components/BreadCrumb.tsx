import { Link } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const BreadCrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex mb-4 lg:w-2/5 mx-auto mt-14" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center text-lg">
                        {item.href ? (
                            <Link to={item.href} className="text-blue-600 hover:text-blue-800">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-500 capitalize">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            // <svg
                            //     className="w-7 h-7 ms-3 text-gray-400"
                            //     fill="currentColor"
                            //     viewBox="0 0 20 20"
                            //     xmlns="http://www.w3.org/2000/svg"
                            // >
                            //     <path
                            //         fillRule="evenodd"
                            //         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            //         clipRule="evenodd"
                            //     ></path>
                            // </svg>
                            <span className="ms-3 text-gray-400">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
