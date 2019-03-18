// using System;

// namespace PartyApi.Helpers
// {
//     public class MetadataTypeFromAttribute
//     {
//         #if !(NET20 || DOTNET)
//         private static Type GetAssociatedMetadataType(Type type)
//         {
//             return AssociatedMetadataTypesCache.Get(type);
//         }

//         private static Type GetAssociateMetadataTypeFromAttribute(Type type)
//         {
//             Attribute[] customAttributes = ReflectionUtils.GetAttributes(type, null, true);

//             foreach (Attribute attribute in customAttributes)
//             {
//                 Type attributeType = attribute.GetType();

//                 // only test on attribute type name
//                 // attribute assembly could change because of type forwarding, etc
//                 if (string.Equals(attributeType.FullName, "System.ComponentModel.DataAnnotations.MetadataTypeAttribute", StringComparison.Ordinal))
//                 {
//                     const string metadataClassTypeName = "MetadataClassType";

//                     if (_metadataTypeAttributeReflectionObject == null)
//                     {
//                         _metadataTypeAttributeReflectionObject = ReflectionObject.Create(attributeType, metadataClassTypeName);
//                     }

//                     return (Type)_metadataTypeAttributeReflectionObject.GetValue(attribute, metadataClassTypeName);
//                 }
//             }

//             return null;
//         }
//         #endif


//     }
// }