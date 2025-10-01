using iPractice.Api.Models.Clients;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.Repositories;

public interface IClientSqlRepository
{
    Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken);
    Task<Client> GetClientByIdAsync(long id, CancellationToken cancellationToken);
    Task<Client> GetClientByNameAsync(string name, CancellationToken cancellationToken);
    Task<List<Client>> GetClientsByIdsAsync(List<long> ids, CancellationToken cancellationToken);
    Task<Client> AddClientAsync(Client psychologist, CancellationToken cancellationToken);
    Task DeleteClientAsync(Client psychologist, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
    
    Task LogAppointmentCommentAsync(long clientId, string comment, CancellationToken cancellationToken);
}